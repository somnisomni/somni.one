import { redirect } from "@sveltejs/kit";

export function load({ route }): void {
  /* Redirect to default subpage (individual projects) if the user navigated to `/me` */
  if(route.id?.endsWith("/works")) {
    redirect(308, "/works/individual");
  }
}
