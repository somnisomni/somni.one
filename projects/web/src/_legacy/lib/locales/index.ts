import { init, register } from "svelte-i18n";
import { browser } from "$app/environment"; // eslint-disable-line import-x/no-unresolved

const SUPPORTED_LOCALES = [ "ko", "en", "ja" ];

for(const locale of SUPPORTED_LOCALES) {
  register(locale, () => import(`./strings/${locale}.json`));
}

init({
  fallbackLocale: "ko",
  initialLocale: browser && window ? window.navigator.language.split(",")[0].split("-")[0] : "en",
});
