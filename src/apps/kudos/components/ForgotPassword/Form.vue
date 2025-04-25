<script lang="ts" setup>
  import type { APIResponseNoData } from '@kudos/types-api';
  import z from 'zod';

  const router = useRouter();
  const kudosAPI = useKudosAPI();

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
      submissionError.value = '';

      if (liveValidate.value) {
        validateForm();
      }
    },
    { deep: true }
  );

  const submitForm = async () => {
    if (validateForm()) {
      try {
        const response = await kudosAPI.post<APIResponseNoData>('/auth/send-password-reset-email', {
          email: formData.value.email,
        });

        if (response.status !== 200) {
          submissionError.value = 'A server error occurred while trying to log in 💀';
          return;
        }

        const innerResponse = response.data;

        // If login is not successful, set the error message and return
        if (innerResponse.status !== 200) {
          if (innerResponse.status === 404) {
            submissionError.value = 'This email address does not belong to an existing user 👀';
            return;
          }

          submissionError.value = 'A server error occurred while trying to log in 💀';
          return;
        }

        message.value = 'Password reset email sent 💪 Check your inbox 📩';

        submitted.value = true;
        formData.value.email = '';
        formError.value = '';
        submissionError.value = '';
        liveValidate.value = false;

        // Redirect to the login page after 5 seconds
        setTimeout(() => {
          router.push('/login');
        }, 5000);
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
      <FormButton class="send-button" @click="submitForm"><span>Send Reset Link</span></FormButton>
      <NuxtLink href="/login" class="login-link">👈 Back to login</NuxtLink>
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

  .send-button {
    justify-content: center;
  }

  .actions {
    width: 100%;

    display: grid;
    gap: 1rem;
  }
</style>
