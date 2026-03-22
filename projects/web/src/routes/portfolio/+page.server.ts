import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export function load(): PageServerLoad {
  // Temporary redirect to Notion page for shorter URL

  redirect(307, "https://somni-ck.notion.site/26e3e4d430e380138690d02e3eb641b4");
}
