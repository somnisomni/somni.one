import type { RouteHandler } from ".";
import type DataCollectorBase from "../collectors/base";
import { collectTargets } from "../lib/collect-target";
import { getDB } from "../lib/db";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cachedData: Record<string, Record<string, any>> = {};

export class GetDataHandler implements RouteHandler {
  public async handle(request: Request, url: URL): Promise<Response> {
    //
    // IDs search parameter is required, in the form of "ids=some-id,another-id,awesome-id" (comma-separated ID string list)
    // In this context, ID refers to a unique identifier for a data item, which is typically generated using `DataCollectorBase.dataId` getter for each data collector.
    //

    console.info("[*] Handling get data request (GET /data)");

    // Get and validate the 'ids' search parameter
    const idParam = url.searchParams.get("ids");
    const idParamSplitted = idParam?.split(",") ?? [];
    if(!idParam || idParamSplitted.length <= 0) {
      return new Response(
        JSON.stringify({ error: "No IDs provided" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Split the IDs by comma and filter out any invalid or non-existent IDs
    const realTargets: Record<string, DataCollectorBase> = {};
    for(const id of idParamSplitted) {
      if(id in collectTargets) {
        realTargets[id] = collectTargets[id];
        continue;
      }

      console.warn(`Data collector with ID "${id}" not found.`);
    }

    // If no valid targets are found, return a 404 response
    if(Object.keys(realTargets).length <= 0) {
      return new Response(
        JSON.stringify({ error: "No valid data IDs provided" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Get collected data for the provided IDs
    const collectedData: Array<Record<string, any>> = [];  // eslint-disable-line @typescript-eslint/no-explicit-any
    for(const id of Object.keys(realTargets)) {
      // If data is cached, use it; otherwise, collect it

      if(id in cachedData) {
        collectedData.push(cachedData[id]);
      } else {
        const collector = realTargets[id];
        const data = await collector.getData(getDB());

        if(!data) {
          console.warn(`No data found for ID "${id}"`);
          continue;
        }

        cachedData[id] = data;
        collectedData.push(data);
      }
    }

    // Return the collected data as JSON
    return new Response(
      JSON.stringify(collectedData),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  }
}
