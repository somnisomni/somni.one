import SteamAPI from "steamapi";

let steamAPIInstance: SteamAPI | null = null;

export function getSteamAPI(): SteamAPI | null {
  if(!process.env.STEAM_API_KEY) {
    console.error("Tried to create SteamAPI but no API key was provided in environment variables.");
    return null;
  }

  if(!steamAPIInstance) {
    steamAPIInstance = new SteamAPI(process.env.STEAM_API_KEY, { inMemoryCacheEnabled: true });
  }

  return steamAPIInstance;
}
