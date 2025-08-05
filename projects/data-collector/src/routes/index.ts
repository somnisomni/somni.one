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
    let response: Response;
    switch(request.method.toUpperCase()) {
      case "GET":
        response = await handler.get(request, url);
        break;
      case "OPTIONS":
        response = new Response(null, { status: 204 });
        break;
      default:
        response = new Response("Method Not Allowed", { status: 405 });
        break;
    }

    // Add CORS headers if the response is valid
    if(response) {
      response.headers.set("Access-Control-Allow-Origin", process.env.FRONTEND_URL ?? "*");
      response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
      response.headers.set("Access-Control-Allow-Headers", "Content-Type");
      return response;
    }
  }

  return new Response("You picked the wrong way", { status: 404 });
}
