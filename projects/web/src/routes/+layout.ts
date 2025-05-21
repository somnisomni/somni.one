import type { LayoutLoad } from "./$types";
import { locale, waitLocale } from "svelte-i18n";
import { browser } from "$app/environment";  // eslint-disable-line import-x/no-unresolved
import "$lib/locales";  // eslint-disable-line import-x/no-unresolved

export const load: LayoutLoad = async () => {
  /* `svelte-i18n` client side locale initialization */
  {
    if(browser && window) {
      locale.set(window.navigator.language);
    }

    await waitLocale();
  }
};
