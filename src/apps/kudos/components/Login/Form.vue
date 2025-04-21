<script lang="ts" setup>
  import z from 'zod';
  import type { APIResponseAuthLogin } from '@kudos/types-api';

  const router = useRouter();
  const kudosAPI = useKudosAPI();

  const liveValidate = ref(false);

  const validationSchema = z.object({
    email: z
      .string()
      .email({ message: 'Invalid email address 💀' })
      .nonempty({ message: 'All fields are required 🙄' }),
    password: z.string().nonempty({ message: 'All fields are required 🙄' }),
  });

  const formData = ref({
    email: '',
    password: '',
  });

  const formErrors = ref({
    email: '',
    password: '',
  });

  const submissionError = ref('');

  const displayError = computed(() => {
    return Object.values(formErrors.value).find(error => error !== '') || submissionError.value;
  });

  // This function is called when the form is submitted or when liveValidate is enabled
  // and the user types in the form fields
  const validateForm = () => {
    liveValidate.value = true;

    const result = validationSchema.safeParse(formData.value);

    if (result.success) {
      formErrors.value = {
        email: '',
        password: '',
      };
      return true;
    } else {
      formErrors.value = {
        email: result.error.formErrors.fieldErrors.email?.[0] || '',
        password: result.error.formErrors.fieldErrors.password?.[0] || '',
      };
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
      // Submit the form data to the server
      try {
        const response = await kudosAPI.get<APIResponseAuthLogin>('/auth/login', {
          auth: {
            username: formData.value.email,
            password: formData.value.password,
          },
        });

        if (response.status !== 200) {
          submissionError.value = 'A server error occurred while trying to log in 💀';
          return;
        }

        const innerResponse = response.data;

        // If login is not successful, set the error message and return
        if (innerResponse.status !== 200) {
          if (innerResponse.status === 401) {
            submissionError.value = 'Email or password is incorrect 👀';
            return;
          }

          submissionError.value = 'A server error occurred while trying to log in 💀';
          return;
        }

        // If login is successful,  redirect to the app page
        router.push({ name: 'app' });
      } catch (error) {
        submissionError.value = 'An error occurred 🙈 Please try again 🥲';
      }
    }
  };
</script>

<template>
  <form action.prevent class="login-form">
    <header class="header">
      <h1>Login</h1>
    </header>
    <AppMessageBox v-if="displayError" type="error">
      <p>{{ displayError }}</p>
    </AppMessageBox>
    <FormFieldText
      label="Email"
      type="email"
      :autofocus="true"
      :error="!!formErrors.email"
      v-model:value="formData.email"
    />
    <FormFieldText label="Password" type="password" :error="!!formErrors.password" v-model:value="formData.password" />
    <div class="actions">
      <NuxtLink href="/forgot-password" class="forgot-password-link">Forgot password? 🙄</NuxtLink>
      <FormButton class="save-button" @click="submitForm"><span>Log in</span></FormButton>
    </div>
  </form>
</template>

<style lang="scss" scoped>
  .login-form {
    width: 100%;

    display: grid;
    gap: 1rem;
  }

  .header {
    display: grid;
    gap: 1rem;

    h1 {
      font-size: 2rem;
      font-weight: 500;
    }
  }

  .actions {
    width: 100%;

    display: flex;
    justify-content: space-between;
    align-items: end;
  }

  .forgot-password-link {
    color: var(--color-text-muted);
    cursor: pointer;

    text-decoration: underline;

    &:hover {
      text-decoration: none;
      color: var(--color-accent-00);
    }
  }
</style>
