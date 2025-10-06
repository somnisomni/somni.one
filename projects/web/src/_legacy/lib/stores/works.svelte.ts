import { getCollectedData } from "$/_legacy/lib/backend/data-collector";
import type { DataCollectorResponse } from "@somni.one/common";

const cachedData = $state<Record<string, DataCollectorResponse>>({});

export async function requestGetData(dataIdList: string[]): Promise<Record<string, DataCollectorResponse>> {
  const data: Record<string, DataCollectorResponse> = {};

  if(dataIdList.length <= 0) {
    return {};
  }

  const dataToFetch = dataIdList.filter(id => !(id in cachedData));
  if(dataToFetch?.length > 0) {
    const fetchedData = await getCollectedData(dataToFetch, fetch);

    if(fetchedData?.length > 0) {
      for(const item of fetchedData) {
        cachedData[item.dataId] = item;
      }
    }
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
