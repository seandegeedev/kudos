<script lang="ts" setup>
  defineProps({
    type: {
      type: String as PropType<'info' | 'error' | 'success'>,
      default: 'info',
    },
  });
</script>

<template>
  <article class="message-box" :data-type="type">
    <slot />
  </article>
</template>

<style lang="scss" scoped>
  .message-box {
    padding: 1rem;
    width: 100%;

    background-color: var(--color-background-01);
    border: 1px solid var(--color-border-00);
    border-radius: 0.5rem;

    &[data-type='error'] {
      background-color: var(--color-status-red-background-00);
      border-color: var(--color-status-red-border-00);

      * {
        color: var(--color-status-red-type-00);
      }
    }

    &[data-type='success'] {
      background-color: var(--color-status-green-background-00);
      border-color: var(--color-status-green-border-00);

      * {
        color: var(--color-status-green-type-00);
      }
    }
  }
</style>
