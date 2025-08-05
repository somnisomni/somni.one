import { getCollectedData } from "$/lib/backend/data-collector";
import type { DataCollectorResponse } from "@somni.one/common";

const cachedData = $state<Record<string, DataCollectorResponse>>({});

export async function requestGetWorkData(dataIdList: string[]): Promise<Record<string, DataCollectorResponse>> {
  const data: Record<string, DataCollectorResponse> = {};

  if(dataIdList.length === 0) {
    return {};
  }

  const dataToFetch = dataIdList.filter(id => !(id in cachedData));
  const fetchedData = await getCollectedData(dataToFetch, fetch);

  for(const item of fetchedData) {
    cachedData[item.dataId] = item;
  }

  for(const id of dataIdList) {
    if(id in cachedData) {
      data[id] = cachedData[id];
    } else {
      delete data[id];
    }
  }

  return data;
}
