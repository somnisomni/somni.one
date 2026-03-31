import { getTextDirection } from "$/lib/i18n/runtime";
import { paraglideMiddleware } from "$/lib/i18n/server";
import type { Handle } from "@sveltejs/kit";
import { locale } from "svelte-i18n";

/* ParaglideJS SSR locale initialization */
const paraglideHandle: Handle = ({ event, resolve }) =>
  paraglideMiddleware(event.request, ({ request: localizedRequest, locale }) => {
    event.request = localizedRequest;

    return resolve(event, {
      transformPageChunk: ({ html }) => {
        return html
          .replace("%lang", locale)
          .replace("%dir%", getTextDirection(locale));
      }
    });
  });


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
