import type { LayoutServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: LayoutServerLoad = async ({ route }) => {
  /* Redirect to default subpage (individual projects) if the user navigated to `/me` */
  if(route.id?.endsWith("/me")) {
    redirect(308, "/me/individual");
  }
};
