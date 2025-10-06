import type { DataCollectorResponse } from "@somni.one/common";

const baseUrl = import.meta.env.VITE_DATA_COLLECTOR_URL;

export async function getCollectedData(dataIdList: string[], customFetch?: typeof fetch): Promise<DataCollectorResponse[]> {
  if(!baseUrl) {
    console.error("Data collector backend URL is not defined");
    return [];
  }

  const url = new URL("/data", baseUrl);
  url.searchParams.append("ids", dataIdList.join(","));

  const response = (await (await (customFetch ?? fetch)(url.href, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "default",
    mode: "cors",
  })).json()) as DataCollectorResponse[];

  return response;
}
