<template>
  <button @click.prevent="changeMonth(-1)">&larr;</button>
  {{ displayedMonth }} {{ year }}
  <button @click.prevent="changeMonth(+1)">&rarr;</button>
  <month-calendar :month="month" :year="year"></month-calendar>
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

let currentDate: Date = new Date()
const year = ref(currentDate.getFullYear())
const month = ref(currentDate.getMonth())

const displayedMonth = computed(() => months[month.value])

function changeMonth(offset: number) {
  month.value = (month.value + offset) % 12
}
</script>
