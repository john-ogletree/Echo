import i18n from 'i18next';

export const getI18nInstance = (resources, lang) => {
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
  }
  return i18n;
};