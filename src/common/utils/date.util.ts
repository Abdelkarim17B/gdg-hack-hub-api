export function isValidDateRange(startDate: Date, endDate: Date): boolean {
  return startDate < endDate;
}

export function isDateInPast(date: Date): boolean {
  return date < new Date();
}

export function formatDate(date: Date): string {
  return date.toISOString();
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}