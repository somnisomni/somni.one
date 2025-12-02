export interface MonkeytypeUserResultData {
  wpm: number;
  rawWpm: number;
  acc: number;
  consistency: number;
  language: string;
  timestamp: number;
}

export interface MonkeytypeUserData {
  name: string;
  lastResult: MonkeytypeUserResultData & { testDuration: number; };
}
