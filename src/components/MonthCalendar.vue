<template>
  <table>
    <tr>
      <th>Пн</th>
      <th>Вт</th>
      <th>Ср</th>
      <th>Чт</th>
      <th>Пт</th>
      <th>Сб</th>
      <th>Вс</th>
    </tr>
    <tr v-for="(row, index) in calendar" :key="index">
      <td
        v-for="date in row"
        :key="date.day"
        :class="{
          surroundingMonth: date.month != month,
          currentDay:
            date.month == currentMonth &&
            date.year == currentYear &&
            date.day == currentDay &&
            month == currentMonth,
          selected: clickedDate && isSameDate(date, clickedDate),
        }"
        @click="setClickedDate(date)"
      >
        {{ date.day }}
      </td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { generateCalendar } from '@/utils/calendar'
import { CalendarDate, isSameDate } from '@/utils/calendar-date'

const props = defineProps<{
  month: number
  year: number
}>()

const currentDay = ref(0)
const currentMonth = ref(0)
const currentYear = ref(0)

setInterval(() => {
  updateTime()
}, 1000)

updateTime()

function updateTime(): void {
  let currentDate: Date = new Date()
  currentDay.value = currentDate.getDate()
  currentMonth.value = currentDate.getMonth()
  currentYear.value = currentDate.getFullYear()
}

const clickedDate = ref()

function setClickedDate(date: CalendarDate): void {
  clickedDate.value = date
  console.log(clickedDate.value)
}

const calendar = computed(() => generateCalendar(props.month + 1, props.year))
</script>

<style scoped>
td {
  box-sizing: border-box;
  padding: 5px 11px 0 11px;
  height: 34px;
  vertical-align: top;
  text-align: center;
  font-size: 0.8em;
  cursor: pointer;
  border-radius: 5px;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}

td:hover {
  background: var(--primary);
  transition: background 0.05s;
}

th {
  padding-bottom: 10px;
  font-size: 0.8em;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}

.surroundingMonth {
  color: var(--text-500);
}

.currentDay {
  color: var(--accent);
}

.selected {
  background-color: var(--accent) !important;
}
</style>
