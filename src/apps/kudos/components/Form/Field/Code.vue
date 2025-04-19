<script lang="ts" setup>
  const props = defineProps({
    code: {
      type: String,
      default: '',
    },
    length: {
      type: Number,
      default: 4,
    },
    type: {
      type: String as PropType<'alphanumeric' | 'numeric'>,
      default: 'alphanumeric',
    },
  });

  const emit = defineEmits(['update:code']);

  const displayCode = ref<string[]>([]);
  const inputs = ref<(HTMLInputElement | null)[]>([]);
  const errorOnEmpty = ref(false);

  // Set show error to true once the user has entered a fill code at least once
  watch(
    () => props.code,
    newCode => {
      if (newCode.length === displayCode.value.length && !errorOnEmpty.value) {
        errorOnEmpty.value = true;
        return;
      }
    }
  );

  const focusInput = (index: number) => {
    const input = inputs.value[index] as HTMLInputElement;
    if (input) {
      input.focus();
    }
  };

  const isValidInput = (char: string): boolean => {
    // Check if the character is a number or letter based on the type or if it is empty
    if (char === '') {
      return true;
    }
    if (props.type === 'numeric') {
      return /^[0-9]$/.test(char);
    } else if (props.type === 'alphanumeric') {
      return /^[a-zA-Z0-9]$/.test(char);
    }
    return false;
  };

  const updateCharacter = (input: string, index: number) => {
    // Prevent input from being more than 2 characters
    const truncatedInput = input.length > 1 ? input.slice(-1) : input;

    // Check if the input is valid, if it is not valid, set the input value to the existing character
    if (!isValidInput(truncatedInput)) {
      const input = inputs.value[index] as HTMLInputElement;
      input.value = displayCode.value[index];

      return;
    }

    // Prevent input from duplicating the existing character by forcing the input to be the same as the existing character
    if (displayCode.value[index] === truncatedInput) {
      const input = inputs.value[index] as HTMLInputElement;
      input.value = truncatedInput;

      // Move focus to the next input
      if (truncatedInput && index < props.length - 1) {
        focusInput(index + 1);
      }

      return;
    }

    // Update the display code with the new character
    displayCode.value[index] = truncatedInput;
    emit('update:code', displayCode.value.join(''));

    // Move focus to the next input
    if (truncatedInput && index < props.length - 1) {
      focusInput(index + 1);
    }
  };

  // Initialize the display code with the existing code
  displayCode.value = Array.from({ length: props.length }, (_, i) =>
    props.code[i] && isValidInput(props.code[i]) ? props.code[i] : ''
  );
  emit('update:code', displayCode.value.join(''));
</script>

<template>
  <div class="form-field-code" :style="{ 'grid-template-columns': displayCode.length }">
    <input
      v-for="(_char, index) of displayCode"
      :key="index"
      ref="inputs"
      type="text"
      class="code-input"
      maxlength="2"
      :data-error="displayCode[index] === '' && errorOnEmpty"
      :id="`code-input-${index}`"
      :value="displayCode[index]"
      :autofocus="index === 0"
      @input="updateCharacter(($event.target as HTMLInputElement).value, index)"
    />
  </div>
</template>

<style lang="scss" scoped>
  .form-field-code {
    display: grid;
    gap: 1rem;
    grid-auto-flow: column;
    justify-content: start;
  }

  .code-input {
    padding: 0.5rem 1rem;
    width: 100%;

    background: var(--color-form-field-background);
    border: 1px solid var(--color-form-field-border);
    border-radius: 0.5rem;
    outline: none;

    font-size: 1.75rem;
    text-align: center;

    &:focus {
      border: 1px solid var(--color-form-field-border-focus);
    }

    &[data-error='true'] {
      border-color: var(--color-form-field-border-error);
    }
  }
</style>
