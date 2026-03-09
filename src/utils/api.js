/**
 * API utilities for AppVerse data fetching
 */

const DEFAULT_API_BASE_URL = '/api';
const DEFAULT_SITE_BASE_URL = '';
const STATIC_CACHE_PATH = '/sites/default/files/appverse-cache/appverse-data.json';

// Sparse fieldsets for app detail view (still fetched via JSON:API for README, org, license)
const APP_DETAIL_FIELDS = [
  'fields[node--appverse_app]=title,body,field_appverse_github_url,field_appverse_readme,field_appverse_lastupdated,field_appverse_stars,flag_count,drupal_internal__nid,field_appverse_software_implemen,field_appverse_app_type,field_add_implementation_tags,field_appverse_organization,field_license',
  'fields[taxonomy_term--appverse_app_type]=name',
  'fields[taxonomy_term--tags]=name',
  'fields[taxonomy_term--appverse_organization]=name',
  'fields[taxonomy_term--appverse_license]=name',
].join('&');

/**
 * Fetch all appverse data from the static JSON cache.
 * Returns software (with nested apps) and filter options in flat shape.
 */
export async function fetchStaticCache(config = {}) {
  const siteBaseUrl = config.siteBaseUrl ?? DEFAULT_SITE_BASE_URL;
  const url = `${siteBaseUrl}${STATIC_CACHE_PATH}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch static cache: ${response.statusText}`);
  }

  const cache = await response.json();

  // Prepend siteBaseUrl to logo URLs
  const software = cache.software.map(sw => ({
    ...sw,
    logoUrl: sw.logoUrl ? `${siteBaseUrl}${sw.logoUrl}` : null,
  }));

  // Flatten apps from nested software and build grouping map
  const appsBySoftwareId = {};
  for (const sw of software) {
    appsBySoftwareId[sw.id] = sw.apps || [];
  }

  return {
    software,
    appsBySoftwareId,
    filterOptions: {
      topics: cache.filterOptions.topics || [],
      license: cache.filterOptions.licenses || [],
      tags: cache.filterOptions.tags || [],
      appType: cache.filterOptions.appTypes || [],
    },
  };
}

/**
 * Fetch apps for a specific software with taxonomy terms resolved.
 * Used by detail page — fetches from JSON:API for full data (README, org, license).
 */
export async function fetchAppsBySoftware(softwareId, config = {}) {
  const apiBaseUrl = config.apiBaseUrl ?? DEFAULT_API_BASE_URL;
  const url = `${apiBaseUrl}/node/appverse_app?filter[field_appverse_software_implemen.id]=${softwareId}&include=field_appverse_app_type,field_add_implementation_tags,field_appverse_organization,field_license&${APP_DETAIL_FIELDS}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch apps: ${response.statusText}`);
    }

    const data = await response.json();
    const apps = data.data || [];
    const included = data.included || [];

    const includedMap = {};
    for (const item of included) {
      includedMap[item.id] = item;
    }

    return apps.map(app => {
      const appTypeData = app.relationships?.field_appverse_app_type?.data;
      const appTypeRefs = Array.isArray(appTypeData) ? appTypeData : (appTypeData ? [appTypeData] : []);
      const appTypes = appTypeRefs
        .map(ref => includedMap[ref.id])
        .filter(Boolean)
        .map(term => ({ id: term.id, name: term.attributes.name }));

      const orgRef = app.relationships?.field_appverse_organization?.data;
      const organization = orgRef && includedMap[orgRef.id]
        ? { id: orgRef.id, name: includedMap[orgRef.id].attributes.name }
        : null;

      const licenseRef = app.relationships?.field_license?.data;
      const license = licenseRef && includedMap[licenseRef.id]
        ? { id: licenseRef.id, name: includedMap[licenseRef.id].attributes.name }
        : null;

      const tagsData = app.relationships?.field_add_implementation_tags?.data || [];
      const tags = tagsData
        .map(ref => includedMap[ref.id])
        .filter(Boolean)
        .map(term => ({ id: term.id, name: term.attributes.name }));

      return {
        id: app.id,
        title: app.attributes?.title || '',
        nid: app.attributes?.drupal_internal__nid,
        githubUrl: app.attributes?.field_appverse_github_url?.uri || null,
        readme: app.attributes?.field_appverse_readme?.value || null,
        body: app.attributes?.body?.processed || app.attributes?.body?.value || null,
        stars: app.attributes?.field_appverse_stars ?? 0,
        flagCount: app.attributes?.flag_count || 0,
        lastUpdated: app.attributes?.field_appverse_lastupdated || null,
        softwareId: app.relationships?.field_appverse_software_implemen?.data?.id || null,
        appTypes,
        organization,
        license,
        tags,
      };
    });

  } catch (error) {
    console.error('Error fetching apps by software:', error);
    throw error;
  }
}
