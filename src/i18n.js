import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const loadTranslations = () => {
  const localesPath = path.join(__dirname, 'locales');
  const resources = {};
  const languages = ['en', 'es', 'fr']; // Define your supported languages

  languages.forEach(lang => {
    const filePath = path.join(localesPath, `${lang}.json`);
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      resources[lang] = { translation: JSON.parse(fileContent) };
    }
  });
  return resources;
};

i18n
  .use(LanguageDetector)
  .init({
    resources: loadTranslations(),
    fallbackLng: 'en',
    debug: true,
    detection: {
      order: ['navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;