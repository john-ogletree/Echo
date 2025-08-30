import { sequence } from 'astro:middleware';
import { domainRedirect } from './domain-redirect';
import { languageRedirect } from './language-redirect';

// Define the onRequest handler for your project by chaining your middleware
export const onRequest = sequence(
  domainRedirect, // Runs first: Handles redirect from root domain to start subdomain
  languageRedirect, // Runs second: Handles language redirect
);