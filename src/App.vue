<template>
  <nav>
    <button @click="toggleDark()">Toggle dark mode</button>
    <router-link to="/">Timetable</router-link> |
    <router-link to="/documents">Documents</router-link> |
    <router-link to="/classes">Classess</router-link> |
  </nav>
  <router-view />
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
