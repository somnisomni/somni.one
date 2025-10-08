export function decodeEmailAddress(obfuscated: string): string {
  const decoded = atob(obfuscated);
  return decoded.replaceAll("{OBFUSCATED}", "").replaceAll("{AT}", "@").replaceAll("{DOT}", ".");
}
