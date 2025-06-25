import type { RouteHandler } from ".";

export class GetDataHandler implements RouteHandler {
  public async handle(request: Request, url: URL): Promise<Response> {
    return new Response("WIP");
  }
}
