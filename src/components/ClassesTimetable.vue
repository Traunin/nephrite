<template>
  <div class="week">
    <div v-for="(day, index) in timetable" :key="index" class="day">
      <div class="week-day">{{ daysOfTheWeek[index] }}</div>
      <div v-for="row in day" :key="row.class + '_' + row.time" class="class">
        <div class="time">{{ row.time }}</div>
        <div class="class-name">{{ row.class }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  timetable: { time: string; class: string }[][]
}>()

const daysOfTheWeek: string[] = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье',
]
</script>

<style scoped>
.week {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.day {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.class {
  display: flex;
  gap: 10px;
  margin: 0 5px;
}

.time {
  width: 40px;
}

.week-day {
  background: var(--secondary);
  padding: 5px 10px;
}
</style>
