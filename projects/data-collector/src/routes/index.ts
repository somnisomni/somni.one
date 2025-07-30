import { GetDataHandler } from "./data";

const handlerMap: Record<string, RouteHandler> = {
  "/data": new GetDataHandler(),
};

export interface RouteHandler {
  handle(request: Request, url: URL): Promise<Response>;
}

export async function handle(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const pathname = url.pathname.replace(/\/$/, "");
  const handler = pathname in handlerMap ? handlerMap[pathname] : null;

  if(handler) {
    return await handler.handle(request, url);
  }

  return new Response("You picked the wrong way", { status: 404 });
}
