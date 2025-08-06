import SteamAPI from "steamapi";

export function createSteamAPI(): SteamAPI | null {
  if(!process.env.STEAM_API_KEY) {
    console.error("Tried to create SteamAPI but no API key was provided in environment variables.");
    return null;
  }

  return new SteamAPI(process.env.STEAM_API_KEY, { inMemoryCacheEnabled: true });
}
