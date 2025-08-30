import { defineMiddleware } from 'astro/middleware';

const SUPPORTED_LANGUAGES = ['en', 'es', 'fr'];
const ALLOWED_SUBDOMAINS = ['start', 'profile', '404'];

export const onRequest = defineMiddleware(async ({ request, rewrite, redirect }, next) => {
  const url = new URL(request.url);
  const hostnameParts = url.hostname.split('.');

  // 1. Redirect the root domain to the 'start' subdomain
  if (hostnameParts.length === 2 && hostnameParts[0] === 'john-ogletree') {
    return redirect(`https://start.${url.hostname}${url.pathname}`);
  }

  // Gets the subdomain (e.g., 'start' from 'start.john-ogletree.site')
  const subdomain = hostnameParts[0];

  // 2. Handle language redirects on any allowed subdomain
  const hasLangPath = SUPPORTED_LANGUAGES.some(lang => url.pathname.startsWith(`/${lang}/`));

  if (ALLOWED_SUBDOMAINS.includes(subdomain) && url.pathname === '/' && !hasLangPath) {
    const acceptLanguageHeader = request.headers.get('accept-language');
    const preferredLanguages = acceptLanguageHeader
      ?.split(',')
      .map(lang => lang.split(';')[0].trim())
      .filter(lang => SUPPORTED_LANGUAGES.includes(lang));

    const redirectLang = preferredLanguages && preferredLanguages.length > 0
      ? preferredLanguages[0]
      : SUPPORTED_LANGUAGES[0];

    // Redirect to the language-specific route on the correct subdomain
    return redirect(`https://${subdomain}.${hostnameParts[1]}.${hostnameParts[2]}/${redirectLang}/`);
  }
  
  // 3. Rewrite the URL based on the subdomain (This is now done after the redirects)
  if (ALLOWED_SUBDOMAINS.includes(subdomain)) {
    // Construct the new path to point to the correct folder, preserving the original path
    const newPathname = `/${subdomain}${url.pathname}`;
    const newUrl = new URL(newPathname, url.origin);
    
    // Rewrites the URL internally to fetch the correct content
    return rewrite(newUrl);
  }

  // 4. Continue with standard routing if no rules apply
  return next();
});