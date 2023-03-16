export function splitAtCapital(str: string): string {
  const parts = str.split(/(?=[A-Z])/);
  if (parts.length > 0 && /^[a-z]/.test(parts[0])) {
    parts[0] = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
  }
  return parts.join(" ");
}

export function twoDecimalPlace(num: number):number {
  return parseFloat(num.toFixed(2));
}
