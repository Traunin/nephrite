export type CalendarDate = {
  day: number
  month: number
  year: number
}

export function getDate(
  day: number,
  month: number,
  year: number
): CalendarDate {
  if (month > 11) {
    year++
    month = 0
  } else if (month < 0) {
    year--
    month = 11
  }

  return {
    day,
    month,
    year,
  }
}

export function isSameDate(date1: CalendarDate, date2: CalendarDate): boolean {
  return (
    date1.day == date2.day &&
    date1.month == date2.month &&
    date1.year == date2.year
  )
}

export function getAsString(date: CalendarDate): string {
  return date.day + '_' + date.month + '_' + date.year
}
