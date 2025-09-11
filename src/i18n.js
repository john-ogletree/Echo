let i18nInstance;

export const setupI18n = async (resources, lang) => {
  if (!i18nInstance) {
    const i18n = (await import('i18next')).default;
    const LanguageDetector = (await import('i18next-browser-languagedetector')).default;

    i18nInstance = i18n;

    if (typeof window !== 'undefined') {
      i18nInstance.use(LanguageDetector);
    }

    await i18nInstance.init({
      resources,
      fallbackLng: 'en',
      lng: lang,
      debug: true,
      detection: {
        order: ['navigator', 'htmlTag', 'path', 'subdomain'],
        caches: ['localStorage'],
      },
      interpolation: {
        escapeValue: false,
      },
    });
  } else {
    i18nInstance.addResourceBundle(lang, 'translation', resources[lang].translation, true, true);
    i18nInstance.changeLanguage(lang);
  }
  return i18nInstance;
};