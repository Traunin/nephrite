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

export function getWeek(date: Date, dowOffset: number): number {
  dowOffset = typeof dowOffset === 'number' ? dowOffset : 0 // default dowOffset to zero
  const newYear = new Date(date.getFullYear(), 0, 1)
  let day = newYear.getDay() - dowOffset // the day of week the year begins on
  day = day >= 0 ? day : day + 7
  const daynum =
    Math.floor(
      (date.getTime() -
        newYear.getTime() -
        (date.getTimezoneOffset() - newYear.getTimezoneOffset()) * 60000) /
        86400000
    ) + 1
  let weeknum
  // if the year starts before the middle of a week
  if (day < 4) {
    weeknum = Math.floor((daynum + day - 1) / 7) + 1
    if (weeknum > 52) {
      const nYear = new Date(date.getFullYear() + 1, 0, 1)
      let nday = nYear.getDay() - dowOffset
      nday = nday >= 0 ? nday : nday + 7
      /* if the next year starts before the middle of
                the week, it is week #1 of that year */
      weeknum = nday < 4 ? 1 : 53
    }
  } else {
    weeknum = Math.floor((daynum + day - 1) / 7)
  }
  return weeknum
}
