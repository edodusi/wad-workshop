<template>
  <footer
      v-if="!['cover'].includes(currentLayout)"
      class="absolute z-10 inline-flex bottom-0 inset-x-0 p-4 justify-between items-center"
  >
    <div class="text-sm font-thin">
      {{ currentSlideNo }}
    </div>

    <a href="https://github.com/storyblok" target="_blank" title="Storyblok on GitHub"
       class="text-xl slidev-icon-btn opacity-50">
      <carbon-logo-github />
    </a>
  </footer>
</template>

<script setup lang="ts">
import { useNav } from '@slidev/client'

const { currentSlideNo, currentLayout } = useNav()
</script>
