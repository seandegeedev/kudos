<script lang="ts" setup>
  const modelValue = defineModel('value', {
    type: String,
    default: '',
  });

  const props = defineProps({
    placeholder: {
      type: String as PropType<string>,
      required: false,
      default: 'Search',
    },
    autofocus: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: false,
    },
  });
</script>

<template>
  <div class="form-field-search">
    <div class="input-wrapper">
      <div class="search-button">
        <icon-magnifying-glass />
      </div>
      <input
        :id="`${$.uid}`"
        type="text"
        :placeholder="placeholder"
        :autofocus="autofocus"
        v-model="modelValue"
        class="input"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .input-wrapper {
    padding: 0.5rem;

    align-items: center;
    display: grid;
    gap: 0.5rem;
    grid-template-columns: auto 1fr;

    background-color: var(--color-form-field-background);
    border: 1px solid var(--color-form-field-border);
    border-radius: 0.5rem;

    &:focus-within {
      border: 1px solid var(--color-form-field-border-focus);
    }
  }

  .input {
    background: none;
    border: none;
    color: var(--color-form-field-text);
    outline: none;

    &[type='password'] {
      letter-spacing: 0.25rem;
    }
  }
</style>
