/**
 * API utilities for AppVerse data fetching
 * Handles JSON:API interactions with Drupal backend
 */

import { logApiResponse } from './apiLogger';

// Use proxy path for all environments (Vite dev server and Netlify both proxy /api)
const BASE_API_URL = '/api';
const BASE_SITE_URL = 'https://md-2622-accessmatch.pantheonsite.io';

// Endpoint constants
const ALL_SOFTWARE_WITH_INCLUDES = `${BASE_API_URL}/node/appverse_software?include=field_appverse_logo,field_appverse_topics,field_license,field_tags`;
const ALL_APPS_WITH_SOFTWARE = `${BASE_API_URL}/node/appverse_app?include=field_appverse_software_implemen,field_add_implementation_tags,field_appverse_app_type`;
const SOFTWARE_BY_ID_WITH_INCLUDES = (id) => `${BASE_API_URL}/node/appverse_software/${id}?include=field_appverse_logo,field_appverse_topics,field_license,field_tags`;
const APPS_BY_SOFTWARE_ID_WITH_INCLUDES = (softwareId) => `${BASE_API_URL}/node/appverse_app?filter[field_appverse_software_implemen.id]=${softwareId}&include=field_appverse_app_type,field_add_implementation_tags,field_appverse_organization,field_license`;
const FILE_BY_ID = (fileId) => `${BASE_API_URL}/file/file/${fileId}`;

/**
 * Fetch all software items with logos, topics, and license
 * @returns {Promise<{software: Array, included: Array}>} Software with resolved data + included for filtering
 */
export async function fetchAllSoftware() {
  try {
    const response = await fetch(ALL_SOFTWARE_WITH_INCLUDES);

    if (!response.ok) {
      throw new Error(`Failed to fetch software: ${response.statusText}`);
    }

    const data = await response.json();
    logApiResponse('ALL_SOFTWARE_WITH_INCLUDES', ALL_SOFTWARE_WITH_INCLUDES, data);

    const softwareList = data.data || [];
    const included = data.included || [];

    // Build a lookup map of all included items by ID
    const includedMap = {};
    for (const item of included) {
      includedMap[item.id] = item;
    }

    // Separate media items for logo resolution
    const mediaMap = {};
    for (const item of included) {
      if (item.type === 'media--svg') {
        mediaMap[item.id] = item;
      }
    }

    // Fetch actual file URLs for each media item
    const mediaFilePromises = Object.keys(mediaMap).map(async (mediaId) => {
      const media = mediaMap[mediaId];
      const fileRelationshipId = media.relationships?.field_media_image_1?.data?.id;

      if (!fileRelationshipId) return null;

      try {
        const fileUrl = FILE_BY_ID(fileRelationshipId);
        const fileResponse = await fetch(fileUrl);
        const fileData = await fileResponse.json();
        logApiResponse('FILE_BY_ID', fileUrl, fileData);
        return {
          mediaId,
          fileUrl: fileData.data?.attributes?.uri?.url || null
        };
      } catch (err) {
        console.error(`Failed to fetch file for media ${mediaId}:`, err);
        return null;
      }
    });

    const mediaFiles = await Promise.all(mediaFilePromises);

    // Create a map of media IDs to file URLs
    const mediaFileMap = {};
    for (const result of mediaFiles) {
      if (result && result.fileUrl) {
        mediaFileMap[result.mediaId] = `${BASE_SITE_URL}${result.fileUrl}`;
      }
    }

    // Attach resolved data to each software item
    const softwareWithData = softwareList.map(software => {
      // Resolve logo URL
      const logoMediaId = software.relationships?.field_appverse_logo?.data?.id;
      const logoUrl = logoMediaId ? mediaFileMap[logoMediaId] : null;

      // Resolve topics (science domains)
      const topicsData = software.relationships?.field_appverse_topics?.data || [];
      const topics = topicsData
        .map(ref => includedMap[ref.id])
        .filter(Boolean)
        .map(term => ({ id: term.id, name: term.attributes.name }));

      // Resolve license
      const licenseRef = software.relationships?.field_license?.data;
      const license = licenseRef && includedMap[licenseRef.id]
        ? { id: licenseRef.id, name: includedMap[licenseRef.id].attributes.name }
        : null;

      // Resolve tags
      const tagsData = software.relationships?.field_tags?.data || [];
      const tags = tagsData
        .map(ref => includedMap[ref.id])
        .filter(Boolean)
        .map(term => ({ id: term.id, name: term.attributes.name }));

      // Extract slug from path.alias (e.g., "/appverse/abaqus" -> "abaqus")
      const pathAlias = software.attributes?.path?.alias;
      const slug = pathAlias ? pathAlias.split('/').filter(Boolean).pop() : null;

      return {
        ...software,
        logoUrl,
        topics,
        license,
        tags,
        slug
      };
    });

    return {
      software: softwareWithData,
      included
    };

  } catch (error) {
    console.error('Error fetching software:', error);
    throw error;
  }
}

/**
 * Fetch all apps with their software relationships and taxonomy terms resolved
 * @returns {Promise<{apps: Array, included: Array}>} Apps with resolved terms + included for filter extraction
 */
export async function fetchAllApps() {
  try {
    const response = await fetch(ALL_APPS_WITH_SOFTWARE);

    if (!response.ok) {
      throw new Error(`Failed to fetch apps: ${response.statusText}`);
    }

    const data = await response.json();
    logApiResponse('ALL_APPS_WITH_SOFTWARE', ALL_APPS_WITH_SOFTWARE, data);

    const apps = data.data || [];
    const included = data.included || [];

    // Build a lookup map of included items by ID
    const includedMap = {};
    for (const item of included) {
      includedMap[item.id] = item;
    }

    // Resolve taxonomy terms for each app
    const appsWithTerms = apps.map(app => {
      // Resolve app type
      const appTypeRef = app.relationships?.field_appverse_app_type?.data;
      const appType = appTypeRef && includedMap[appTypeRef.id]
        ? { id: appTypeRef.id, name: includedMap[appTypeRef.id].attributes.name }
        : null;

      // Resolve implementation tags
      const tagsData = app.relationships?.field_add_implementation_tags?.data || [];
      const tags = tagsData
        .map(ref => includedMap[ref.id])
        .filter(Boolean)
        .map(term => ({ id: term.id, name: term.attributes.name }));

      return {
        ...app,
        appType,
        tags
      };
    });

    return {
      apps: appsWithTerms,
      included
    };

  } catch (error) {
    console.error('Error fetching apps:', error);
    throw error;
  }
}

/**
 * Extract filter options from included taxonomy terms (Apps response)
 * @param {Array} included - Included array from JSON:API response
 * @returns {Object} Filter options keyed by taxonomy type
 */
export function extractFilterOptionsFromApps(included) {
  const filterOptions = {
    tags: [],
    appType: []
  };

  for (const item of included) {
    if (item.type === 'taxonomy_term--tags') {
      filterOptions.tags.push({
        id: item.id,
        name: item.attributes.name
      });
    } else if (item.type === 'taxonomy_term--appverse_app_type') {
      filterOptions.appType.push({
        id: item.id,
        name: item.attributes.name
      });
    }
  }

  // Sort alphabetically
  filterOptions.tags.sort((a, b) => a.name.localeCompare(b.name));
  filterOptions.appType.sort((a, b) => a.name.localeCompare(b.name));

  return filterOptions;
}

/**
 * Extract filter options from included taxonomy terms (Software response)
 * @param {Array} included - Included array from JSON:API response
 * @returns {Object} Filter options keyed by taxonomy type
 */
export function extractFilterOptionsFromSoftware(included) {
  const filterOptions = {
    topics: [],
    license: [],
    tags: []  // Software also has tags (field_tags)
  };

  for (const item of included) {
    if (item.type === 'taxonomy_term--appverse_science_domains') {
      filterOptions.topics.push({
        id: item.id,
        name: item.attributes.name
      });
    } else if (item.type === 'taxonomy_term--appverse_license') {
      filterOptions.license.push({
        id: item.id,
        name: item.attributes.name
      });
    } else if (item.type === 'taxonomy_term--tags') {
      filterOptions.tags.push({
        id: item.id,
        name: item.attributes.name
      });
    }
  }

  // Sort alphabetically
  filterOptions.topics.sort((a, b) => a.name.localeCompare(b.name));
  filterOptions.license.sort((a, b) => a.name.localeCompare(b.name));
  filterOptions.tags.sort((a, b) => a.name.localeCompare(b.name));

  return filterOptions;
}

/**
 * Fetch a single software item by ID with logo and taxonomy terms
 * @param {string} id - Software UUID
 * @returns {Promise<Object>} Software object with logo URL and resolved taxonomy terms
 */
export async function fetchSoftwareById(id) {
  try {
    const url = SOFTWARE_BY_ID_WITH_INCLUDES(id);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch software: ${response.statusText}`);
    }

    const data = await response.json();
    logApiResponse('SOFTWARE_BY_ID_WITH_INCLUDES', url, data);
    const software = data.data;
    const included = data.included || [];

    // Build a lookup map of included items by ID
    const includedMap = {};
    for (const item of included) {
      includedMap[item.id] = item;
    }

    // Resolve logo URL
    let logoUrl = null;
    const logoMediaId = software.relationships?.field_appverse_logo?.data?.id;
    if (logoMediaId) {
      const logoMedia = includedMap[logoMediaId];
      const fileRelationshipId = logoMedia?.relationships?.field_media_image_1?.data?.id;

      if (fileRelationshipId) {
        try {
          const fileEndpoint = FILE_BY_ID(fileRelationshipId);
          const fileResponse = await fetch(fileEndpoint);
          const fileData = await fileResponse.json();
          logApiResponse('FILE_BY_ID', fileEndpoint, fileData);
          const fileUrl = fileData.data?.attributes?.uri?.url;
          if (fileUrl) {
            logoUrl = `${BASE_SITE_URL}${fileUrl}`;
          }
        } catch (err) {
          console.error(`Failed to fetch logo file:`, err);
        }
      }
    }

    // Resolve taxonomy terms: topics (science domains)
    const topicsData = software.relationships?.field_appverse_topics?.data || [];
    const topics = topicsData
      .map(ref => includedMap[ref.id])
      .filter(Boolean)
      .map(term => ({ id: term.id, name: term.attributes.name }));

    // Resolve taxonomy terms: license
    const licenseRef = software.relationships?.field_license?.data;
    const license = licenseRef && includedMap[licenseRef.id]
      ? { id: licenseRef.id, name: includedMap[licenseRef.id].attributes.name }
      : null;

    // Resolve taxonomy terms: tags
    const tagsData = software.relationships?.field_tags?.data || [];
    const tags = tagsData
      .map(ref => includedMap[ref.id])
      .filter(Boolean)
      .map(term => ({ id: term.id, name: term.attributes.name }));

    // Extract slug from path.alias
    const pathAlias = software.attributes?.path?.alias;
    const slug = pathAlias ? pathAlias.split('/').filter(Boolean).pop() : null;

    return {
      ...software,
      logoUrl,
      topics,
      license,
      tags,
      slug
    };

  } catch (error) {
    console.error('Error fetching software by ID:', error);
    throw error;
  }
}

/**
 * Fetch apps for a specific software with taxonomy terms resolved
 * @param {string} softwareId - Software UUID
 * @returns {Promise<Array>} Array of app objects with resolved taxonomy terms
 */
export async function fetchAppsBySoftware(softwareId) {
  try {
    const url = APPS_BY_SOFTWARE_ID_WITH_INCLUDES(softwareId);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch apps: ${response.statusText}`);
    }

    const data = await response.json();
    logApiResponse('APPS_BY_SOFTWARE_ID_WITH_INCLUDES', url, data);

    const apps = data.data || [];
    const included = data.included || [];

    // Build a lookup map of included items by ID
    const includedMap = {};
    for (const item of included) {
      includedMap[item.id] = item;
    }

    // Resolve taxonomy terms for each app
    const appsWithTerms = apps.map(app => {
      // Resolve app type
      const appTypeRef = app.relationships?.field_appverse_app_type?.data;
      const appType = appTypeRef && includedMap[appTypeRef.id]
        ? { id: appTypeRef.id, name: includedMap[appTypeRef.id].attributes.name }
        : null;

      // Resolve organization
      const orgRef = app.relationships?.field_appverse_organization?.data;
      const organization = orgRef && includedMap[orgRef.id]
        ? { id: orgRef.id, name: includedMap[orgRef.id].attributes.name }
        : null;

      // Resolve license
      const licenseRef = app.relationships?.field_license?.data;
      const license = licenseRef && includedMap[licenseRef.id]
        ? { id: licenseRef.id, name: includedMap[licenseRef.id].attributes.name }
        : null;

      // Resolve implementation tags
      const tagsData = app.relationships?.field_add_implementation_tags?.data || [];
      const tags = tagsData
        .map(ref => includedMap[ref.id])
        .filter(Boolean)
        .map(term => ({ id: term.id, name: term.attributes.name }));

      return {
        ...app,
        appType,
        organization,
        license,
        tags
      };
    });

    return appsWithTerms;

  } catch (error) {
    console.error('Error fetching apps by software:', error);
    throw error;
  }
}

/**
 * Group apps by their software relationship ID
 * @param {Array} apps - Array of app objects
 * @returns {Object} Object keyed by software UUID, values are arrays of apps
 */
export function groupAppsBySoftware(apps) {
  const grouped = {};

  for (const app of apps) {
    const softwareId = app.relationships?.field_appverse_software_implemen?.data?.id;

    if (softwareId) {
      if (!grouped[softwareId]) {
        grouped[softwareId] = [];
      }
      grouped[softwareId].push(app);
    }
  }

  return grouped;
}
