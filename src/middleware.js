import { defineMiddleware } from 'astro/middleware';

export const onRequest = defineMiddleware(async ({ request, rewrite }, next) => {
  const url = new URL(request.url);
  const hostnameParts = url.hostname.split('.');
  
  // Gets the subdomain (e.g., 'start' from 'start.john-ogletree.site')
  const subdomain = hostnameParts[0];

  // A list of valid subdomains that map to a folder in src/pages/
  const allowedSubdomains = ['start', 'profile', '404'];
  
  if (allowedSubdomains.includes(subdomain)) {
    // Construct the new path to point to the correct folder, preserving the original path
    // For example, start.john-ogletree.site/en/ -> /start/en/
    const newPathname = `/${subdomain}${url.pathname}`;
    const newUrl = new URL(newPathname, url.origin);
    
    // Rewrites the URL internally to fetch the correct content
    return rewrite(newUrl);
  }

  // If no matching subdomain, continue with standard routing
  return next();
});