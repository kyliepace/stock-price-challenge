/**
 * 
 * check that string is YYYY-MM-DD format
 */
export function isDateStringFormat(input: string): boolean {
  const pattern = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/;
  return pattern.test(input);
}


/**
 * 
 * check that first date is earlier than 2nd
 */
export function isBefore(since: string, until: string): boolean {
  return new Date(since) < new Date(until);
}

export function toEpochTime(date: string): number{
  return new Date(date).getTime();
}