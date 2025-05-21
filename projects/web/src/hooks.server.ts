import type { Handle } from "@sveltejs/kit";
import { locale } from "svelte-i18n";

export const handle: Handle = async ({ event, resolve }) => {
  /* `svelte-i18n` SSR locale initialization */
  {
    const lang = event.request.headers.get("Accept-Language")?.split(",")[0].split("-")[0];

    if(lang) {
      locale.set(lang);
    }
  }

  return resolve(event);
};
