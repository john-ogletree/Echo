import i18n from 'i18next';

// This function will be called with resources from the Astro component
export const setupI18n = (resources, lang) => {
  if (!i18n.isInitialized) {
    i18n.init({
      resources,
      fallbackLng: 'en',
      lng: lang,
      debug: true,
      interpolation: {
        escapeValue: false,
      },
    });
  } else {
    i18n.addResourceBundle(lang, 'translation', resources[lang].translation, true, true);
    i18n.changeLanguage(lang);
  }
  return i18n;
};