<script lang="ts" setup>
  import useMessageQueueStore from '@/stores/messageQueue';

  const messageQueueStore = useMessageQueueStore();
</script>

<template>
  <div class="app-overlay-message">
    <AppMessages v-if="messageQueueStore.messages.length" />
  </div>
</template>

<style lang="scss" scoped>
  .app-overlay-message {
    padding: 1.5rem;

    align-items: end;
    display: grid;
    justify-items: end;

    pointer-events: none;
  }
</style>
