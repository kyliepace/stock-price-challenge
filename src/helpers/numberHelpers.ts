
export function toInt(value: string | number): number {
  if (typeof value === 'string'){
    return parseInt(value);
  }
  return value;
}