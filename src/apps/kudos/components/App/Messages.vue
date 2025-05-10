<script lang="ts" setup>
  import useMessageQueueStore from '@/stores/messageQueue';

  const messageQueueStore = useMessageQueueStore();

  const dismissCurrentMessage = () => {
    if (messageQueueStore.currentMessage) {
      messageQueueStore.dismissCurrentMessage();
    }
  };

  const pauseCurrentMessage = () => {
    if (messageQueueStore.currentMessage) {
      messageQueueStore.pauseMessageCountdown();
    }
  };

  const resumeCurrentMessage = () => {
    if (messageQueueStore.currentMessage) {
      messageQueueStore.resumeMessageCountdown();
    }
  };
</script>

<template>
  <div class="messages" @mouseover="pauseCurrentMessage" @mouseleave="resumeCurrentMessage">
    <div class="content">
      <p>
        {{ messageQueueStore.currentMessage?.message }}
      </p>
    </div>
    <div class="actions">
      <div class="actions-inner">
        <div class="counter">
          <p>{{ messageQueueStore.messages.length }} left</p>
        </div>
        <div class="close" @click="dismissCurrentMessage">
          <icon-xmark class="close-icon" />
        </div>
      </div>
    </div>
    <div class="message-countdown" :style="{ width: `${messageQueueStore.currentMessageTimeLeftPercent}%` }"></div>
  </div>
</template>

<style lang="scss" scoped>
  .messages {
    min-height: 3rem;
    min-width: min(25rem, 100%);
    overflow: hidden;

    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: 1fr auto;

    background-color: var(--color-background-00);
    border: 1px solid var(--color-border-00);
    border-radius: 0.5rem;

    pointer-events: all;

    animation: slide-up 0.5s ease-in-out forwards;

    @keyframes slide-up {
      0% {
        opacity: 0;
        transform: translateY(1rem);
      }
      50% {
        opacity: 0;
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }

  .message-countdown {
    height: 4px;

    display: flex;
    grid-column: 1 / -1;
    grid-row: 2;

    background-color: var(--color-accent-00);
  }

  .content {
    padding: 0.5rem;
  }

  .actions {
    padding: 0.5rem;

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
