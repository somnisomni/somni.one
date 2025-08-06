export interface SteamUserData {
  nickname: string;
  profileUrl: string;
  lastPlayedGame: SteamUserGameData | null;
}

export interface SteamUserGameData {
  name: string;
  appUrl: string;
  totalPlayTimeMinutes: number;
}
