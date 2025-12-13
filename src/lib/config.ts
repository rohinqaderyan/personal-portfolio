/**
 * Configuration Module
 * @description Environment and app configuration utilities
 */
export function getConfig() {
  return {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    contactMode: (process.env.NEXT_PUBLIC_CONTACT_MODE || 'client-only') as 'flask' | 'client-only',
    flaskApiUrl: process.env.FLASK_API_URL || 'http://localhost:5000',
    plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
    gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    enableLinkedInEmbed: process.env.NEXT_PUBLIC_ENABLE_LINKEDIN_EMBED === 'true',
    linkedInEmbedUrl: process.env.NEXT_PUBLIC_LINKEDIN_EMBED_URL,
    utmSource: process.env.NEXT_PUBLIC_UTM_SOURCE || 'portfolio',
    utmMedium: process.env.NEXT_PUBLIC_UTM_MEDIUM || 'website',
    utmCampaign: process.env.NEXT_PUBLIC_UTM_CAMPAIGN || 'project-share',
  };
}

export function getLinkedInShareUrl(url: string, config: ReturnType<typeof getConfig>) {
  const params = new URLSearchParams({
    url: `${url}?utm_source=${config.utmSource}&utm_medium=${config.utmMedium}&utm_campaign=${config.utmCampaign}`,
  });

  return `https://www.linkedin.com/sharing/share-offsite/?${params.toString()}`;
}

export function isProduction() {
  return process.env.NODE_ENV === 'production';
}
