<script lang="ts" setup>
  import z from 'zod';
  import useAccountStore from '@/stores/account';
  import type { APIResponseNoData } from '@kudos/types-api';

  const kudosAPI = useKudosAPI();
  const accountStore = useAccountStore();

  const validationSchema = z.object({
    email: z
      .string()
      .nonempty({ message: 'The email field is required 🙄' })
      .email({ message: 'Invalid email address 💀' }),
  });

  const liveValidate = ref(false);

  const formData = ref({
    email: accountStore.email,
  });

  const formErrors = ref({
    email: '',
  });

  const saveError = ref('');

  const displayError = computed(() => {
    return Object.values(formErrors.value).find(error => error !== '') || saveError.value;
  });

  const showChangeEmailButton = computed(() => {
    return formData.value.email !== accountStore.email;
  });

  // This function is called when the form is submitted or when liveValidate is enabled
  // and the user types in the form fields
  const validateForm = () => {
    liveValidate.value = true;

    const result = validationSchema.safeParse(formData.value);

    if (result.success) {
      formErrors.value = {
        email: '',
      };
      return true;
    } else {
      formErrors.value = {
        email: result.error.formErrors.fieldErrors.email?.[0] || '',
      };
      return false;
    }
  };

  const saveEmail = async () => {
    if (validateForm()) {
      // Submit the form data to the server
      try {
        const response = await kudosAPI.post<APIResponseNoData>('/account/update-email', formData.value);

        if (response.status !== 200) {
          saveError.value = 'A server error occurred while trying to update account details 💀';
          return;
        }

        const innerResponse = response.data;

        // If update is not successful, set the error message and return
        if (innerResponse.status !== 200) {
          if (innerResponse.status === 400) {
            saveError.value = 'The email address is already in use by another account 😢';
            return;
          }

          saveError.value = 'A server error occurred while trying to update account details 💀';
          return;
        }

        // If the update is successful, log out the user and redirect to the login page
        await accountStore.logout();
      } catch (error) {
        saveError.value = 'An error occurred 🙈 Please try again 🥲';
      }
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
</script>

<template>
  <form action.prevent class="email-form">
    <header class="header">
      <h2>Email</h2>
      <FormButton v-if="showChangeEmailButton" @click="saveEmail">Update Email</FormButton>
    </header>
    <p class="disclaimer">
      <strong>Note:</strong> Changing your email will log you out and require you to verify the new email address. A
      verification link will be sent to the new email address.
    </p>
    <AppMessageBox v-if="displayError" type="error">
      <p>{{ displayError }}</p>
    </AppMessageBox>
    <div class="fields">
      <FormFieldText label="Email" :error="!!formErrors.email" autocomplete="email" v-model:value="formData.email" />
    </div>
  </form>
</template>

<style lang="scss" scoped>
  .email-form {
    padding: 1rem 0;
    margin-bottom: 0.5rem;

    container-type: inline-size;
    display: grid;
    gap: 1rem;
  }

  .fields {
    display: grid;
    gap: 1rem;
    grid-template-columns: minmax(auto, 25rem);
    justify-content: start;

    @container (max-width: 500px) {
      grid-template-columns: 1fr;
    }
  }

  .header {
    padding-bottom: 0.5rem;

    align-items: end;
    display: flex;
    justify-content: space-between;

    border-bottom: 1px solid var(--color-border-00);

    h2 {
      font-size: 1.2rem;
    }
  }
</style>
