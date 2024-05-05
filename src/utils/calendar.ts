import { CalendarDate, getDate } from '@/utils/calendar-date'

export function generateCalendar(
  month: number,
  year: number
): CalendarDate[][] {
  let daysInAPreviousMonth: number = getDaysInAMonth(month - 1, year)
  const daysInCurrentMonth: number = getDaysInAMonth(month, year)
  const dayOfTheWeek: number = getDayOfTheWeek(month, year)

  const lines = Math.ceil((dayOfTheWeek + daysInCurrentMonth) / 7)
  const calendarSheet: CalendarDate[][] = new Array(lines)
    .fill(0)
    .map(() => new Array(7).fill(0))

  for (let i: number = dayOfTheWeek - 1; i >= 0; i--) {
    calendarSheet[0][i] = getDate(daysInAPreviousMonth, month - 2, year)
    daysInAPreviousMonth--
  }

  let r = 0
  let c: number = dayOfTheWeek

  for (let day = 1; day <= daysInCurrentMonth; day++) {
    calendarSheet[r][c] = getDate(day, month - 1, year)
    c++
    r = r + Math.floor(c / 7)
    c %= 7
  }

  let day = 1
  for (; c <= 6 && r < lines; c++) {
    calendarSheet[r][c] = getDate(day, month, year)
    day++
  }
  return calendarSheet
}

function getDaysInFebruary(year: number): number {
  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
    return 29
  }
  return 28
}

function getDaysInAMonth(month: number, year: number): number {
  if (month == 4 || month == 6 || month == 9 || month == 11) {
    return 30
  } else if (month == 2) {
    return getDaysInFebruary(year)
  }
  return 31
}

function getDayOfTheWeek(month: number, year: number): number {
  if (month < 3) {
    year--
  }
  month = ((month + 9) % 12) + 1
  return (
    (floorMod(
      1 +
        Math.floor(2.6 * month - 0.2) -
        2 * Math.floor(year / 100) +
        (year % 100) +
        (year % 100) / 4 +
        Math.floor(year / 400),
      7
    ) +
      6) %
    7
  )
}

function floorMod(x: number, y: number): number {
  return ((Math.floor(x) % y) + y) % y
}
