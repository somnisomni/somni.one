import { redirect } from "@sveltejs/kit";

export function load({ route }): void {
  /* Redirect to default subpage (individual projects) if the user navigated to `/me` */
  if(route.id?.endsWith("/me")) {
    redirect(308, "/me/individual");
  }
}
