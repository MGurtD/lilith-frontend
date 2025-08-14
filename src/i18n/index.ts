import { createI18n } from "vue-i18n";
import messages from "./translations";

const localStorageLangKey = "app.lang";
const initial = (
  localStorage.getItem(localStorageLangKey) ||
  (navigator.language || "ca").slice(0, 2) ||
  "ca"
).toLowerCase();

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: initial,
  fallbackLocale: "es",
  messages,
});

export function setI18nLocale(locale: string) {
  const lang = (locale || "ca").slice(0, 2).toLowerCase();
  (i18n.global.locale as any).value = lang;
}
