import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import uzTranslation from '../locales/uz/translation.json';
import ruTranslation from '../locales/ru/translation.json';

const resources = {
  uz: {
    translation: uzTranslation,
  },
  ru: {
    translation: ruTranslation,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ru', // Agar til aniqlanmasa, rus tilini ishlatish
    debug: false, // Ishlab chiqishda yordam beruvchi loglarni o'chirish
    interpolation: {
      escapeValue: false, // React allaqachon XSS'dan himoya qiladi
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n; 