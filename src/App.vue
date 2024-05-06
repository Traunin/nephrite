<template>
  <nav>
    <button @click="toggleDark()">Toggle dark mode</button>
    <router-link to="/">Timetable</router-link> |
    <router-link to="/documents">Documents</router-link> |
    <router-link to="/classes">Classes</router-link>
  </nav>
  <div class="content">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<style>
nav {
  padding: 30px;
  display: flex;
  justify-content: center;
  gap: 20px;
}

nav a {
  font-weight: bold;
  text-decoration: none;
  color: var(--text);
}

nav a.router-link-exact-active {
  color: var(--accent);
}

.content {
  display: flex;
  justify-content: center;
}
</style>
