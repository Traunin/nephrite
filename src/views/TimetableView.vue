<template>
  <div class="calendar">
    <div class="calendar-controller">
      <button @click.prevent="changeMonth(-1)">&lt;</button>
      <span @click="resetDate()">{{ displayedMonth }} {{ year }}</span>
      <button @click.prevent="changeMonth(+1)">&gt;</button>
    </div>

    <month-calendar :month="month" :year="year"></month-calendar>
  </div>
  <div class="timetable">
    <div class="timetable-controller">
      <button @click.prevent="changeWeek(-1)">&lt;</button>
      <a @click.prevent="resetWeek()" title="Вернуться на текущую неделю">{{
        weekNames[selectedWeek]
      }}</a>
      <button @click.prevent="changeWeek(+1)">&gt;</button>
    </div>

    <classes-timetable :timetable="timetable[selectedWeek]"></classes-timetable>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import MonthCalendar from '@/components/MonthCalendar.vue'
import ClassesTimetable from '@/components/ClassesTimetable.vue'
import { getWeek } from '@/utils/calendar-date'

const months: string[] = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
]

let currentDate: Date = new Date()
const year = ref(currentDate.getFullYear())
const month = ref(currentDate.getMonth())

const displayedMonth = computed(() => months[month.value])

function changeMonth(offset: number): void {
  const offsetValue = month.value + offset
  if (offsetValue > 11) {
    year.value++
    month.value = 0
  } else if (offsetValue < 0) {
    year.value--
    month.value = 11
  } else {
    month.value = offsetValue
  }
}

function resetDate(): void {
  currentDate = new Date()
  year.value = currentDate.getFullYear()
  month.value = currentDate.getMonth()
}

const timetable: { time: string; class: string }[][][] = [
  [
    [
      { time: '9:45', class: 'АИСД' },
      { time: '11:30', class: 'МЛИТА' },
      { time: '13:25', class: 'Матан' },
    ],
    [
      { time: '8:00', class: 'Алгем' },
      { time: '9:45', class: 'Матан' },
      { time: '13:25', class: 'История' },
      { time: '15:10', class: 'Физра' },
    ],
    [
      { time: '8:00', class: 'АИСД' },
      { time: '9:45', class: 'История' },
      { time: '11:30', class: 'WEBтех' },
      { time: '13:15', class: 'Культурология' },
      { time: '18:40', class: 'АВС' },
    ],
    [
      { time: '9:45', class: 'Английский' },
      { time: '11:30', class: 'Английский' },
      { time: '13:25', class: 'АВС' },
      { time: '15:10', class: 'Дискра' },
      { time: '16:55', class: 'Физра' },
    ],
    [
      { time: '8:00', class: 'Алгем' },
      { time: '9:45', class: 'Алгем' },
      { time: '13:25', class: 'Дискра' },
    ],
  ],

  [
    [{ time: '13:25', class: 'Матан' }],
    [
      { time: '8:00', class: 'Алгем' },
      { time: '9:45', class: 'Матан' },
      { time: '11:30', class: 'Английский' },
      { time: '13:25', class: 'История' },
      { time: '15:10', class: 'Физра' },
    ],
    [
      { time: '8:00', class: 'АИСД' },
      { time: '9:45', class: 'История' },
      { time: '11:30', class: 'Си' },
      { time: '13:15', class: 'Культурология' },
      { time: '18:40', class: 'АВС' },
    ],
    [
      { time: '8:00', class: 'Си' },
      { time: '9:45', class: 'АИСД' },
      { time: '11:30', class: 'Web-тех' },
      { time: '13:25', class: 'АВС' },
      { time: '15:10', class: 'Дискра' },
      { time: '16:55', class: 'Физра' },
    ],
    [
      { time: '8:00', class: 'Алгем' },
      { time: '9:45', class: 'МЛИТА' },
      { time: '13:25', class: 'Дискра' },
    ],
  ],
]

const selectedWeek = ref(0)
const totalWeeks = timetable.length
const weekNames: string[] = ['Числитель', 'Знаменатель']
resetWeek()

function changeWeek(offset: number): void {
  let weekPostOffset = selectedWeek.value + offset
  if (weekPostOffset >= totalWeeks) {
    weekPostOffset = 0
  } else if (weekPostOffset < 0) {
    weekPostOffset = totalWeeks - 1
  }

  selectedWeek.value = weekPostOffset
}

function resetWeek(): void {
  selectedWeek.value = (getWeek(currentDate, 1) + 1) % totalWeeks
}
</script>

<style scoped>
.calendar,
.timetable {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.calendar-controller,
.timetable-controller {
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}

.calendar-controller span,
.timetable-controller a {
  width: 120px;
  text-align: center;
  cursor: pointer;
  color: var(--secondary);
}

.calendar-controller button,
.timetable-controller button {
  background: var(--primary);
  border-radius: 5px;
  border: none;
  cursor: pointer;
  color: var(--text);
  font-size: 1.3em;
}
</style>
