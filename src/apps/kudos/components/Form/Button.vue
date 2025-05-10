<script lang="ts" setup>
  defineProps({
    to: {
      type: String as PropType<string>,
      required: false,
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: false,
    },
    type: {
      type: String as PropType<'solid' | 'outline' | 'mono' | 'negative' | 'positive'>,
      required: false,
      default: 'solid',
    },
    size: {
      type: String as PropType<'small' | 'normal' | 'large'>,
      required: false,
      default: 'normal',
    },
  });
</script>

<template>
  <template v-if="to">
    <NuxtLink
      :to="disabled ? '' : to"
      class="form-button"
      :class="[disabled ? 'form-button--disabled' : `form-button--${type}`, `form-button--${size}`]"
      tabindex="0"
    >
      <slot></slot>
    </NuxtLink>
  </template>
  <template v-else>
    <button
      class="form-button"
      :class="[disabled ? 'form-button--disabled' : `form-button--${type}`, `form-button--${size}`]"
      :disabled="disabled"
      @click.prevent
      tabindex="0"
    >
      <slot></slot>
    </button>
  </template>
</template>

<style lang="scss" scoped>
  .form-button {
    all: unset;

    display: inline-grid;

    border-radius: 0.25rem;
    cursor: pointer;

    transition: background-color 0.2s, color 0.2s;

    &.form-button--small {
      padding: 0.35rem;
    }

    &.form-button--normal {
      padding: 0.35rem 1.5rem;
    }

    &.form-button--large {
      padding: 0.75rem 1.5rem;
    }

    &.form-button--solid {
      background-color: var(--color-button-normal-background-00);
      border: 1px solid var(--color-button-normal-border-00);
      color: var(--color-text-brightest);

      :deep(p),
      :deep(span) {
        color: var(--color-text-brightest);
      }

      &:hover {
        background-color: var(--color-button-normal-background-01);
        border: 1px solid var(--color-button-normal-border-01);
      }
    }

    &.form-button--outline {
      background-color: var(--color-button-outline-background-00);
      border: 1px solid var(--color-button-outline-border-00);

      &:hover {
        background-color: var(--color-button-outline-background-01);
      }
    }

    &.form-button--mono {
      background-color: var(--color-button-mono-background-00);
      border: 1px solid var(--color-button-mono-border-00);

      &:hover {
        background-color: var(--color-button-mono-background-01);
      }
    }

    &.form-button--negative {
      background-color: var(--color-status-red-background-00);
      border: 1px solid var(--color-status-red-border-00);
      color: var(--color-status-red-type-00);

      :deep(p),
      :deep(span) {
        color: var(--color-status-red-type-00);
      }

      &:hover {
        background-color: var(--color-status-red-background-01);
      }
    }

    &.form-button--positive {
      background-color: var(--color-status-green-background-00);
      border: 1px solid var(--color-status-green-border-00);
      color: var(--color-status-green-type-00);

      :deep(p),
      :deep(span) {
        color: var(--color-status-green-type-00);
      }

      &:hover {
        background-color: var(--color-status-green-background-01);
      }
    }

    &.form-button--disabled {
      color: var(--color-type-01);
      background-color: var(--color-button-disabled-background-00);
      border: 1px solid var(--color-button-disabled-border-00);
      cursor: not-allowed;
    }
  }
</style>
