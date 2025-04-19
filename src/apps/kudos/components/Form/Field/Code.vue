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

  const focusInput = (index: number) => {
    const input = inputs.value[index] as HTMLInputElement;
    if (input) {
      input.focus();
    }
  };

  const isValidInput = (char: string): boolean => {
    // Check if the character is a number or letter based on the type
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

      return;
    }

    // Update the display code with the new character
    displayCode.value[index] = truncatedInput;
    emit('update:code', displayCode.value.join(''));

    // Move focus to the next input if the character is valid
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
  <div>
    <div v-for="(_char, index) of displayCode" :key="index" class="code-input-container">
      <input
        ref="inputs"
        type="text"
        class="code-input"
        maxlength="2"
        :data-index="index"
        :value="displayCode[index]"
        :autofocus="index === 0"
        @input="updateCharacter(($event.target as HTMLInputElement).value, index)"
      />
    </div>
  </div>
</template>
