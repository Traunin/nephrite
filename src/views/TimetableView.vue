<template>
  <div class="calendar">
    <div class="calendar-controller">
      <button @click.prevent="changeMonth(-1)">&lt;</button>
      <span @click="resetDate()">{{ displayedMonth }} {{ year }}</span>
      <button @click.prevent="changeMonth(+1)">&gt;</button>
    </div>

    <month-calendar :month="month" :year="year"></month-calendar>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import MonthCalendar from '@/components/MonthCalendar.vue'

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

const currentDate: Date = new Date()
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
  const currentDate: Date = new Date()
  year.value = currentDate.getFullYear()
  month.value = currentDate.getMonth()
}
</script>

<style scoped>
.calendar {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.calendar-controller {
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}

.calendar-controller span {
  width: 120px;
  text-align: center;
  cursor: pointer;
}

.calendar-controller button {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-color);
  font-size: 1.3em;
}
</style>
