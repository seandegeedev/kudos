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

  const focusInput = (index: number) => {
    const input = document.querySelector(`.code-input[data-index="${index}"]`) as HTMLInputElement;
    if (input) {
      input.focus();
    }
  };

  const isValidInput = (char: string) => {
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

    // Check if the input is valid
    if (!isValidInput(truncatedInput)) {
      const input = document.querySelector(`.code-input[data-index="${index}"]`) as HTMLInputElement;
      input.value = displayCode.value[index];

      return;
    }

    // Prevent input from duplicating the existing character by forcing the input to be the same as the existing character
    if (displayCode.value[index] === truncatedInput) {
      const input = document.querySelector(`.code-input[data-index="${index}"]`) as HTMLInputElement;
      input.value = truncatedInput;

      return;
    }

    displayCode.value[index] = truncatedInput;

    emit('update:code', displayCode.value.join(''));

    // Move focus to the next input if the character is valid
    if (truncatedInput && index < props.length - 1) {
      focusInput(index + 1);
    }
  };

  displayCode.value = Array.from({ length: props.length }, (_, i) =>
    isValidInput(props.code[i]) ? props.code[i] : ''
  );

  emit('update:code', displayCode.value.join(''));
</script>

<template>
  <div>
    <div v-for="(_char, index) of displayCode" :key="index" class="code-input-container">
      <input
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
