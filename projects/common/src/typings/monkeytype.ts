export interface MonkeytypeUserResultData {
  wpm: number;
  rawWpm: number;
  acc: number;
  consistency: number;
  timestamp: number;
}

export interface MonkeytypeUserData {
  name: string;
  lastResult: MonkeytypeUserResultData & { testDuration: number; };
}
