/**
 * API utilities for AppVerse data fetching
 * Handles JSON:API interactions with Drupal backend
 */

import { logApiResponse } from './apiLogger';

// Use proxy in development, direct URL in production
const isDevelopment = import.meta.env.DEV;
const BASE_API_URL = isDevelopment ? '/api' : 'https://md-2622-accessmatch.pantheonsite.io/jsonapi';
const BASE_SITE_URL = 'https://md-2622-accessmatch.pantheonsite.io';

// Endpoint constants
const ALL_SOFTWARE_WITH_LOGOS = `${BASE_API_URL}/node/appverse_software?include=field_appverse_logo`;
const ALL_APPS_WITH_SOFTWARE = `${BASE_API_URL}/node/appverse_app?include=field_appverse_software_implemen`;
const SOFTWARE_BY_ID_WITH_LOGO = (id) => `${BASE_API_URL}/node/appverse_software/${id}?include=field_appverse_logo`;
const APPS_BY_SOFTWARE_ID = (softwareId) => `${BASE_API_URL}/node/appverse_app?filter[field_appverse_software_implemen.id]=${softwareId}`;
const FILE_BY_ID = (fileId) => `${BASE_API_URL}/file/file/${fileId}`;

/**
 * Fetch all software items with their logo relationships
 * @returns {Promise<Array>} Array of software objects with resolved logo URLs
 */
export async function fetchAllSoftware() {
  try {
    // Fetch software with logo relationship included
    const response = await fetch(ALL_SOFTWARE_WITH_LOGOS);

    if (!response.ok) {
      throw new Error(`Failed to fetch software: ${response.statusText}`);
    }

    const data = await response.json();
    logApiResponse('ALL_SOFTWARE_WITH_LOGOS', ALL_SOFTWARE_WITH_LOGOS, data);

    // Extract software and included media resources
    const softwareList = data.data || [];
    const includedMedia = data.included || [];

    // Create a map of media UUIDs to media objects for quick lookup
    const mediaMap = {};
    for (const media of includedMedia) {
      if (media.type === 'media--svg') {
        mediaMap[media.id] = media;
      }
    }

    // Now fetch the actual file URLs for each media item
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

    // Attach logo URLs to software objects
    const softwareWithLogos = softwareList.map(software => {
      const logoMediaId = software.relationships?.field_appverse_logo?.data?.id;
      const logoUrl = logoMediaId ? mediaFileMap[logoMediaId] : null;

      return {
        ...software,
        logoUrl // Add resolved logo URL directly to software object
      };
    });

    return softwareWithLogos;

  } catch (error) {
    console.error('Error fetching software:', error);
    throw error;
  }
}

/**
 * Fetch all apps with their software relationships
 * @returns {Promise<Array>} Array of app objects
 */
export async function fetchAllApps() {
  try {
    const response = await fetch(ALL_APPS_WITH_SOFTWARE);

    if (!response.ok) {
      throw new Error(`Failed to fetch apps: ${response.statusText}`);
    }

    const data = await response.json();
    logApiResponse('ALL_APPS_WITH_SOFTWARE', ALL_APPS_WITH_SOFTWARE, data);
    return data.data || [];

  } catch (error) {
    console.error('Error fetching apps:', error);
    throw error;
  }
}

/**
 * Fetch a single software item by ID with logo
 * @param {string} id - Software UUID
 * @returns {Promise<Object>} Software object with logo URL
 */
export async function fetchSoftwareById(id) {
  try {
    // Fetch software with logo relationship included
    const url = SOFTWARE_BY_ID_WITH_LOGO(id);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch software: ${response.statusText}`);
    }

    const data = await response.json();
    logApiResponse('SOFTWARE_BY_ID_WITH_LOGO', url, data);
    const software = data.data;
    const includedMedia = data.included || [];

    // Find the logo media if it exists
    const logoMediaId = software.relationships?.field_appverse_logo?.data?.id;
    let logoUrl = null;

    if (logoMediaId) {
      const logoMedia = includedMedia.find(item => item.id === logoMediaId);
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

    return {
      ...software,
      logoUrl
    };

  } catch (error) {
    console.error('Error fetching software by ID:', error);
    throw error;
  }
}

/**
 * Fetch apps for a specific software
 * @param {string} softwareId - Software UUID
 * @returns {Promise<Array>} Array of app objects for this software
 */
export async function fetchAppsBySoftware(softwareId) {
  try {
    const url = APPS_BY_SOFTWARE_ID(softwareId);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch apps: ${response.statusText}`);
    }

    const data = await response.json();
    logApiResponse('APPS_BY_SOFTWARE_ID', url, data);
    return data.data || [];

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
