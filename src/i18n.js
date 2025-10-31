import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ru from "../public/locales/russian/translation.json";
import pl from "../public/locales/polish/translation.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ru: { translation: ru },
      pl: { translation: pl },
    },
    lng: "ru",
    fallbackLng: "ru",
    interpolation: {
      escapeValue: false, // для React не требуется
    },
  });

export default i18n;
