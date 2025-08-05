import { getCollectedData } from "$/lib/backend/data-collector";

const cachedData = $state<Record<string, Record<string, any>>>({});

export async function requestGetWorkData(dataIdList: string[]): Promise<Record<string, Record<string, any>>> {
  const data: Record<string, Record<string, any>> = {};

  if(dataIdList.length === 0) {
    return {};
  }

  const dataToFetch = dataIdList.filter(id => !(id in cachedData));
  const fetchedData = await getCollectedData(dataToFetch, fetch);

  for(const item of fetchedData) {
    cachedData[item.id] = item.data;
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
