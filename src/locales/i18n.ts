import i18next from "i18next"
import {initReactI18next} from "react-i18next"

import en from "_locales/en.json"
import id from "_locales/id.json"

export const I18nLocaleOptions = ["id", "en"] as const
export type I18nLocales = typeof I18nLocaleOptions[number]

i18next.use(initReactI18next).init({
  defaultNS: "common",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
    format: (value, format, _lng) => {
      if (format === "uppercase") {
        return value.toUpperCase()
      }

      return value
    },
    formatSeparator: ",",
  },
  lng: "en",
  load: "languageOnly",
  ns: ["common"],
  resources: {
    en: {common: en},
    id: {common: id},
  },
})

export default i18next
