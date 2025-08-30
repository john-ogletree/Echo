import { defineMiddleware, redirect } from 'astro:middleware';

export const domainRedirect = defineMiddleware(async ({ request }, next) => {
  const url = new URL(request.url);
  const hostnameParts = url.hostname.split('.');

  // Only run this middleware on the root domain
  if (hostnameParts.length === 2 && hostnameParts[0] === 'john-ogletree') {
    return redirect(`https://start.${url.hostname}${url.pathname}`);
  }
  
  // If not the root domain, pass the request to the next middleware
  return next();
});