<script lang="ts" setup>
  import z from 'zod';

  const message = ref('Ai... Enter your email address and we will send you a link to reset your password.');
  const submitted = ref(false);
  const liveValidate = ref(false);
  const formError = ref('');
  const submissionError = ref('');

  const displayError = computed(() => {
    return formError.value || submissionError.value;
  });

  const formData = ref({
    email: '',
  });

  const validationSchema = z.object({
    email: z
      .string()
      .nonempty({ message: 'All fields are required 🙄' })
      .email({ message: 'Invalid email address 💀' }),
  });

  // This function is called when the form is submitted or when liveValidate is enabled
  // and the user types in the form fields
  const validateForm = (): boolean => {
    liveValidate.value = true;
    formError.value = '';

    const result = validationSchema.safeParse(formData.value);

    if (result.success) {
      return true;
    } else {
      formError.value = result.error.formErrors.fieldErrors.email?.[0] || '';
      return false;
    }
  };

  // If liveValidate is enabled, validate the form on every change
  // This is useful for showing validation errors as the user types
  watch(
    () => formData.value,
    () => {
      if (liveValidate.value) {
        validateForm();
      }
    },
    { deep: true }
  );

  const submitForm = async () => {
    if (validateForm()) {
      try {
      } catch (error) {
        submissionError.value = 'An error occurred 🙈 Please try again 🥲';
      }
    }
  };
</script>

<template>
  <form class="forgot-password-form">
    <header class="header">
      <h1>Forgot your password? 👀</h1>
    </header>
    <AppMessageBox class="message" :type="submitted ? 'success' : 'info'">
      <p>{{ message }}</p>
    </AppMessageBox>
    <AppMessageBox v-if="displayError" type="error">
      <p>{{ displayError }}</p>
    </AppMessageBox>
    <FormFieldText label="Email" type="email" :autofocus="true" :error="!!formError" v-model:value="formData.email" />
    <div class="actions">
      <FormButton class="save-button" @click="submitForm"><span>Send Reset Link</span></FormButton>
    </div>
  </form>
</template>

<style lang="scss" scoped>
  .forgot-password-form {
    width: 100%;

    display: grid;
    gap: 1rem;
  }

  .message {
    width: 100%;

    display: grid;
    gap: 1rem;

    line-height: 1.2rem;
  }

  .actions {
    width: 100%;

    display: flex;
    justify-content: flex-end;
    align-items: end;
  }
</style>
