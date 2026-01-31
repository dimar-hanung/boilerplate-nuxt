<script setup lang="ts">
import { useColorMode } from '@vueuse/core'

// Initialize color mode
useColorMode({
  attribute: 'class',
  modes: {
    light: '',
    dark: 'dark',
  },
})
</script>

<template>
   <div>
     <NuxtRouteAnnouncer />
     <NuxtPage />
   </div>
 </template>
