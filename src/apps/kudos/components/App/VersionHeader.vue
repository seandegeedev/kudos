<script lang="ts" setup>
  import { version } from '@/package.json';
</script>

<template>
  <header class="app-version-header">
    <div>
      <span class="version-text">Kudos Release {{ version }}</span>
    </div>
  </header>
</template>

<style lang="scss" scoped>
  .app-version-header {
    padding: 0.5rem 1rem;

    display: flex;
    justify-content: flex-end;
  }

  .version-text {
    color: var(--color-text-muted);
  }
</style>
