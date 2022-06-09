export function getTimeIntervalInMillisecond(date: Date): number {
  const now = Date.now();

  return now - date.getTime();
}
