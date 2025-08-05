/* eslint-disable @typescript-eslint/no-explicit-any */

const baseUrl = import.meta.env.VITE_DATA_COLLECTOR_URL;

export async function getCollectedData(dataIdList: string[], customFetch?: typeof fetch): Promise<Array<Record<string, any>>> {
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
  })).json()) as Array<Record<string, any>>;

  return response;
}
