import { GetDataHandler } from "./data";

const handlerMap: Record<string, RouteHandler> = {
  "/data": new GetDataHandler(),
};

export interface RouteHandler {
  get(request: Request, url: URL): Promise<Response>;
}

export async function handle(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const pathname = url.pathname.replace(/\/$/, "");
  const handler = pathname in handlerMap ? handlerMap[pathname] : null;

  if(handler) {
    const handlerResponse = await handler.get(request, url);

    // Add CORS headers if the response is valid
    if(handlerResponse) {
      handlerResponse.headers.set("Access-Control-Allow-Origin", process.env.FRONTEND_URL ?? "*");
      handlerResponse.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
      return handlerResponse;
    }
  }

  return new Response("You picked the wrong way", { status: 404 });
}
