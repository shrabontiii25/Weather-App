export function formatLocalTime(dtSeconds: number, timezoneOffsetSeconds: number): string {
  const shiftedMs = (dtSeconds + timezoneOffsetSeconds) * 1000;
  return new Date(shiftedMs).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'UTC',
  });
}