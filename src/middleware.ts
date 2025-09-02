import { defineMiddleware, rewrite, redirect } from 'astro:middleware';

const SUPPORTED_LANGUAGES = ['en', 'es', 'fr'];

export const onRequest = defineMiddleware(async ({ request }, next) => {
  const url = new URL(request.url);
  
  // 1. Handle the root path, redirecting to a language-prefixed root
  if (url.pathname === '/') {
    const acceptLanguageHeader = request.headers.get('accept-language');
    const preferredLanguages = acceptLanguageHeader
      ?.split(',')
      .map(lang => lang.split(';')[0].trim())
      .filter(lang => SUPPORTED_LANGUAGES.includes(lang));

    const redirectLang = preferredLanguages && preferredLanguages.length > 0
      ? preferredLanguages[0]
      : SUPPORTED_LANGUAGES[0];

    // Redirect to the determined language
    return redirect(`/${redirectLang}/`);
  }

  // 2. If a valid language is not in the path, redirect to the default language.
  const hasLangPath = SUPPORTED_LANGUAGES.some(lang => url.pathname.startsWith(`/${lang}/`));
  if (!hasLangPath) {
    const redirectLang = SUPPORTED_LANGUAGES[0]; // Fallback to 'en'
    const newPath = `/${redirectLang}${url.pathname}`;
    return redirect(newPath);
  }

  // 3. Continue to the next middleware or route
  return next();
});