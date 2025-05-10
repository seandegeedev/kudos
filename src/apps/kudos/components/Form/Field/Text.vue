<script lang="ts" setup>
  const modelValue = defineModel('value', {
    type: String,
    default: '',
  });

  const props = defineProps({
    label: {
      type: String as PropType<string>,
      required: false,
    },
    placeholder: {
      type: String as PropType<string>,
      required: false,
      default: '',
    },
    type: {
      type: String as PropType<'text' | 'email' | 'password'>,
      required: false,
      default: 'text',
    },
    error: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: false,
    },
    required: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    autofocus: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: false,
    },
    autocomplete: {
      type: String as PropType<string>,
      required: false,
      default: 'on',
    },
  });

  // Define a prop for the password visibility toggle
  const passwordVisible = ref(false);
  const togglePasswordVisibility = () => {
    passwordVisible.value = !passwordVisible.value;
  };

  // Define a computed property for the input type
  const inputType = computed(() => {
    if (!props.type) {
      return 'text';
    }

    return props.type === 'password' && passwordVisible.value ? 'text' : props.type;
  });
</script>

<template>
  <div class="form-field-text">
    <label :for="`${$.uid}`" class="label">
      <p v-if="label">
        <span>{{ label }}</span>
        <span v-if="required" title="Required" class="required-asterisk"><icon-asterisk /></span>
      </p>
      <slot v-else name="label" />
    </label>
    <div class="input-wrapper" :data-error="error">
      <input
        :id="`${$.uid}`"
        :type="inputType"
        :placeholder="placeholder"
        :autofocus="autofocus"
        :autocomplete="autocomplete"
        v-model="modelValue"
        class="input"
      />
      <div v-if="type === 'password'" class="visibility-toggle" @click="togglePasswordVisibility">
        <icon-eye-slash v-if="passwordVisible" />
        <icon-eye v-else />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .form-field-text {
    display: grid;
    gap: 0.5rem;
  }

  .required-asterisk {
    margin-left: 0.25rem;

    color: var(--color-form-field-required);

    font-size: 0.6rem;
    vertical-align: top;
  }

  .input-wrapper {
    padding: 0.5rem;

    align-items: center;
    display: grid;
    grid-template-columns: 1fr auto;

    background-color: var(--color-form-field-background);
    border: 1px solid var(--color-form-field-border);
    border-radius: 0.5rem;

    &:focus-within {
      border: 1px solid var(--color-form-field-border-focus);
    }

    &[data-error='true'] {
      border-color: var(--color-form-field-border-error);
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

  .visibility-toggle {
    cursor: pointer;
  }
</style>
