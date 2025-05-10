<script lang="ts" setup>
  import z from 'zod';
  import type { APIResponseNoData } from '@kudos/types-api';

  const kudosAPI = useKudosAPI();

  const validationSchema = z.object({
    currentPassword: z.string().nonempty({ message: 'Current password is required 🙄' }),
    newPassword: z
      .string()
      .min(8, { message: 'Password should contain at least 8 characters 🔑' })
      .max(32, { message: 'Password can only contain at most 32 characters 🔑' }),
  });

  const liveValidate = ref(false);

  const formData = ref({
    currentPassword: '',
    newPassword: '',
  });

  const formErrors = ref({
    currentPassword: '',
    newPassword: '',
  });

  const saveError = ref('');

  const displayError = computed(() => {
    return Object.values(formErrors.value).find(error => error !== '') || saveError.value;
  });

  const showChangePasswordButton = computed(() => {
    return formData.value.currentPassword !== '' && formData.value.newPassword !== '';
  });

  // This function is called when the form is submitted or when liveValidate is enabled
  // and the user types in the form fields
  const validateForm = () => {
    liveValidate.value = true;

    const result = validationSchema.safeParse(formData.value);

    if (result.success) {
      formErrors.value = {
        currentPassword: '',
        newPassword: '',
      };
      return true;
    } else {
      formErrors.value = {
        currentPassword: result.error.formErrors.fieldErrors.currentPassword?.[0] || '',
        newPassword: result.error.formErrors.fieldErrors.newPassword?.[0] || '',
      };
      return false;
    }
  };

  const savePassword = async () => {
    if (validateForm()) {
      // Submit the form data to the server
      try {
        const response = await kudosAPI.post<APIResponseNoData>('/account/update-password', formData.value);

        if (response.status !== 200) {
          saveError.value = 'A server error occurred while trying to update password 💀';
          return;
        }

        const innerResponse = response.data;

        // If login is not successful, set the error message and return
        if (innerResponse.status !== 200) {
          saveError.value = 'A server error occurred while trying to update password 💀';
          return;
        }

        // If login is successful, clear the form
        formData.value = {
          currentPassword: '',
          newPassword: '',
        };
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
  <form action.prevent class="password-form">
    <header class="header">
      <h2>Password</h2>
      <FormButton v-if="showChangePasswordButton" @click="savePassword">Change Password</FormButton>
    </header>
    <div class="fields">
      <FormFieldText
        label="Current Password"
        type="password"
        :error="!!formErrors.currentPassword"
        autocomplete="current-password"
        v-model:value="formData.currentPassword"
      />
      <FormFieldText
        label="New Password"
        type="password"
        :error="!!formErrors.newPassword"
        autocomplete="new-password"
        v-model:value="formData.newPassword"
      />
    </div>
  </form>
</template>

<style lang="scss" scoped>
  .password-form {
    padding: 1rem 0;

    container-type: inline-size;
    display: grid;
    gap: 1rem;
  }

  .fields {
    display: grid;
    gap: 1rem;
    grid-template-columns: minmax(auto, 25rem) minmax(auto, 25rem);
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
