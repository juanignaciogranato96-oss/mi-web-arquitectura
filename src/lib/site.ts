const FALLBACK_SITE_URL = "https://jg-visual-estudio.com";

function normalizeUrl(url: string) {
  return url.replace(/\/$/, "");
}

export function getSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (raw && raw.trim().length > 0) {
    return normalizeUrl(raw.trim());
  }
  return normalizeUrl(FALLBACK_SITE_URL);
}

export function getMetadataBase(): URL {
  const siteUrl = getSiteUrl();
  try {
    return new URL(siteUrl);
  } catch {
    return new URL(FALLBACK_SITE_URL);
  }
}

export function getAbsoluteUrl(path: string) {
  return new URL(path, getMetadataBase()).toString();
}

export { FALLBACK_SITE_URL };
