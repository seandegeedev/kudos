<script lang="ts" setup>
  const currentProgress = ref<number>(75.4);

  const dismissCurrentMessage = () => {};
</script>

<template>
  <div class="messages">
    <div class="content"></div>
    <div class="actions">
      <div class="actions-inner">
        <div class="counter">
          <p>1/3</p>
        </div>
        <div class="close" @click="dismissCurrentMessage">
          <icon-xmark class="close-icon" />
        </div>
      </div>
    </div>
    <div class="message-countdown" :style="{ width: `${currentProgress}%` }"></div>
  </div>
</template>

<style lang="scss" scoped>
  .messages {
    min-height: 4rem;
    min-width: min(25rem, 100%);
    overflow: hidden;

    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: 1fr auto;

    background-color: var(--color-background-00);
    border: 1px solid var(--color-border-00);
    border-radius: 0.5rem;

    pointer-events: all;
  }

  .message-countdown {
    height: 4px;

    display: flex;
    grid-column: 1 / -1;
    grid-row: 2;

    background-color: var(--color-accent-00);
  }

  .actions {
    padding: 0.25rem 0.5rem;

    align-items: start;
    display: flex;
  }

  .actions-inner {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .counter {
    p {
      color: var(--color-text-muted);
    }
  }

  .close-icon {
    cursor: pointer;

    font-size: 0.75rem;
  }
</style>
