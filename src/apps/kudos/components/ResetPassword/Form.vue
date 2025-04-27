<script lang="ts" setup>
  import z from 'zod';

  const route = useRoute();
  const router = useRouter();

  const kudosAPI = useKudosAPI();

  const resetToken = route.query.token as string;

  // If token is not present in the query parameters, redirect to the app page
  if (!resetToken) {
    router.push({ name: 'app' });
  }

  const liveValidate = ref(false);

  const validationSchema = z
    .object({
      password: z.string().nonempty({ message: 'All fields are required 🙄' }),
      confirmedPassword: z.string().nonempty({ message: 'All fields are required 🙄' }),
    })
    .refine(
      data => {
        return data.password === data.confirmedPassword;
      },
      {
        message: 'Passwords do not match 💀',
        path: ['confirmedPassword'],
      }
    );

  const formData = ref({
    password: '',
    confirmedPassword: '',
  });

  const formErrors = ref({
    password: '',
    confirmedPassword: '',
  });

  const submissionError = ref('');
  const resetSuccess = ref(false);

  const displayError = computed(() => {
    return Object.values(formErrors.value).find(error => error !== '') || submissionError.value;
  });

  // This function is called when the form is submitted or when liveValidate is enabled
  // and the user types in the form fields
  const validateForm = (): boolean => {
    liveValidate.value = true;

    const result = validationSchema.safeParse(formData.value);

    if (result.success) {
      formErrors.value = {
        password: '',
        confirmedPassword: '',
      };
      return true;
    } else {
      formErrors.value = {
        password: result.error.formErrors.fieldErrors.password?.[0] || '',
        confirmedPassword: result.error.formErrors.fieldErrors.confirmedPassword?.[0] || '',
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
      submissionError.value = '';

      try {
        const response = await kudosAPI.post('/auth/reset-password', {
          token: resetToken,
          password: formData.value.password,
        });

        if (response.status !== 200) {
          submissionError.value = 'A server error occurred💀';
          return;
        }

        const innerResponse = response.data;

        // If reset is not successful, set the error message and return
        if (innerResponse.status !== 200) {
          if (innerResponse.status === 400) {
            submissionError.value = 'Reset token invalid 👀';
            return;
          }

          submissionError.value = 'A server error occurred💀';
          return;
        }

        // If login is successful,  redirect to the app page after 2 seconds
        resetSuccess.value = true;
        setTimeout(() => {
          router.push({ name: 'app' });
        }, 2000);
      } catch (error) {
        submissionError.value = 'An error occurred 🙈 Please try again 🥲';
      }
    }
  };
</script>

<template>
  <form action.prevent class="reset-password-form">
    <header class="header">
      <h1>Reset password</h1>
    </header>
    <AppMessageBox v-if="displayError" type="error">
      <p>{{ displayError }}</p>
    </AppMessageBox>
    <AppMessageBox v-if="resetSuccess" type="success">
      <p>Your password has been reset succesfully 💪</p>
    </AppMessageBox>
    <FormFieldText
      label="New password"
      type="password"
      :autofocus="true"
      :error="!!formErrors.password"
      v-model:value="formData.password"
    />
    <FormFieldText
      label="Confirm password"
      type="password"
      :error="!!formErrors.confirmedPassword"
      v-model:value="formData.confirmedPassword"
    />
    <div class="actions">
      <FormButton class="save-button" @click="submitForm"><span>Save</span></FormButton>
    </div>
  </form>
</template>

<style lang="scss" scoped>
  .reset-password-form {
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

  .save-button {
    justify-content: center;
  }

  .actions {
    width: 100%;

    display: grid;
    gap: 1rem;
  }
</style>
