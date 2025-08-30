import { defineMiddleware, redirect } from 'astro:middleware';

const SUPPORTED_LANGUAGES = ['en', 'es', 'fr'];
const ALLOWED_SUBDOMAINS = ['start', 'profile', '404'];

export const languageRedirect = defineMiddleware(async ({ request }, next) => {
  const url = new URL(request.url);
  const hostnameParts = url.hostname.split('.');
  const subdomain = hostnameParts[0];

  // Only redirect if it's an allowed subdomain, at the root path, and has no language path
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

    return redirect(`https://${subdomain}.${hostnameParts[1]}.${hostnameParts[2]}/${redirectLang}/`);
  }
  
  return next();
});