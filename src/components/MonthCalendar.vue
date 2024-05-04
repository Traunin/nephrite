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
      <td v-for="date in row" :key="date">{{ date }}</td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { generateCalendar } from '@/utils/calendar'
const props = defineProps<{
  month: number
  year: number
}>()

const calendar = computed(() => generateCalendar(props.month + 1, props.year))
</script>
