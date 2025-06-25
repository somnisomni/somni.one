import type { RouteHandler } from ".";

export class GetDataHandler implements RouteHandler {
  public async handle(request: Request, url: URL): Promise<Response> {
    //
    // IDs search parameter is required, in the form of "ids=some-id,another-id,awesome-id" (comma-separated ID string list)
    // In this context, ID refers to a unique identifier for a data item, which is typically generated using `DataCollectorBase.dataId` getter for each data collector.
    //

    const idParam = url.searchParams.get("ids");
    if(!idParam) {
      return new Response("No IDs provided", { status: 400 });
    }

    const idParamSplitted = idParam.split(",");
    for(const id of idParamSplitted) {
      // TODO
    }

    return new Response("WIP");
  }
}
