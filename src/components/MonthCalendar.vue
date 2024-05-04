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
        :key="date"
        :class="{
          surroundingMonth:
            (index == 0 && date > 20) || (index > 2 && date < 10),
          currentDay: props.month == month && props.year == year && date == day,
          selected:
            props.month == clickedMonth &&
            props.year == clickedYear &&
            date == clickedDay,
        }"
        @click="setClickedDate(date, props.month, props.year)"
      >
        {{ date }}
      </td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { generateCalendar } from '@/utils/calendar'
const props = defineProps<{
  month: number
  year: number
}>()

const day = ref(0)
const month = ref(0)
const year = ref(0)

const clickedDay = ref(0)
const clickedMonth = ref(0)
const clickedYear = ref(0)

setInterval(() => {
  updateTime()
}, 1000)

updateTime()

function updateTime(): void {
  let currentDate: Date = new Date()
  day.value = currentDate.getDate()
  month.value = currentDate.getMonth()
  year.value = currentDate.getFullYear()
}

function setClickedDate(day: number, month: number, year: number): void {
  clickedDay.value = day
  clickedMonth.value = month
  clickedYear.value = year
}

const calendar = computed(() => generateCalendar(props.month + 1, props.year))
</script>

<style scoped>
td {
  padding: 5px 11px 12px 11px;
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
  background: rgb(63, 63, 63);
  transition: background 0.05s;
}

th {
  padding-bottom: 10px;
  font-size: 0.8em;
}

.surroundingMonth {
  color: rgb(76, 76, 76);
}

.currentDay {
  color: rgb(138, 92, 245);
}

.selected {
  background-color: rgb(138, 92, 245) !important;
}
</style>
