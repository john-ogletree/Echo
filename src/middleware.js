import { defineMiddleware } from 'astro/middleware';

// Define a list of supported languages for your website
const SUPPORTED_LANGUAGES = ['en', 'es', 'fr'];

export const onRequest = defineMiddleware(async ({ request, rewrite, redirect }, next) => {
  const url = new URL(request.url);
  const hostnameParts = url.hostname.split('.');

  // 1. Redirect the root domain to the 'start' subdomain
  if (hostnameParts.length === 2 && hostnameParts[0] === 'john-ogletree') {
    return redirect(`https://start.${url.hostname}${url.pathname}`);
  }

  // Gets the subdomain (e.g., 'start' from 'start.john-ogletree.site')
  const subdomain = hostnameParts[0];

  // A list of valid subdomains that map to a folder in src/pages/
  const allowedSubdomains = ['start', 'profile', '404'];
  
  // 2. Rewrite the URL based on the subdomain
  if (allowedSubdomains.includes(subdomain)) {
    // Construct the new path to point to the correct folder, preserving the original path
    // For example, start.john-ogletree.site/en/ -> /start/en/
    const newPathname = `/${subdomain}${url.pathname}`;
    const newUrl = new URL(newPathname, url.origin);
    
    // Rewrites the URL internally to fetch the correct content
    return rewrite(newUrl);
  }

  // 3. Handle language redirects for the root path
  const isRootPath = url.pathname === '/';
  const hasLangPath = SUPPORTED_LANGUAGES.some(lang => url.pathname.startsWith(`/${lang}/`));

  if (isRootPath && !hasLangPath) {
    // Get the preferred languages from the browser's "Accept-Language" header
    const acceptLanguageHeader = request.headers.get('accept-language');
    const preferredLanguages = acceptLanguageHeader
      ?.split(',')
      .map(lang => lang.split(';')[0].trim())
      .filter(lang => SUPPORTED_LANGUAGES.includes(lang));

    // Determine the redirect language
    const redirectLang = preferredLanguages && preferredLanguages.length > 0
      ? preferredLanguages[0]
      : SUPPORTED_LANGUAGES[0];

    // Redirect to the language-specific route
    return redirect(`/${redirectLang}/`);
  }

  // 4. Continue with standard routing if none of the above rules apply
  return next();
});