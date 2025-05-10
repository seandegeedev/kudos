<script lang="ts" setup>
  import z from 'zod';
  import useAccountStore from '@/stores/account';
  import type { APIResponseNoData } from '@kudos/types-api';

  const kudosAPI = useKudosAPI();
  const accountStore = useAccountStore();

  const validationSchema = z.object({
    firstName: z.string().nonempty({ message: 'Both names are required 🙄' }),
    lastName: z.string().nonempty({ message: 'Both names are required 🙄' }),
  });

  const liveValidate = ref(false);

  const formData = ref({
    firstName: accountStore.firstName,
    lastName: accountStore.lastName,
  });

  const formErrors = ref({
    firstName: '',
    lastName: '',
  });

  const saveError = ref('');

  const displayError = computed(() => {
    return Object.values(formErrors.value).find(error => error !== '') || saveError.value;
  });

  const showSaveButton = computed(() => {
    return formData.value.firstName !== accountStore.firstName || formData.value.lastName !== accountStore.lastName;
  });

  // This function is called when the form is submitted or when liveValidate is enabled
  // and the user types in the form fields
  const validateForm = () => {
    liveValidate.value = true;

    const result = validationSchema.safeParse(formData.value);

    if (result.success) {
      formErrors.value = {
        firstName: '',
        lastName: '',
      };
      return true;
    } else {
      formErrors.value = {
        firstName: result.error.formErrors.fieldErrors.firstName?.[0] || '',
        lastName: result.error.formErrors.fieldErrors.lastName?.[0] || '',
      };
      return false;
    }
  };

  const saveDetails = async () => {
    if (validateForm()) {
      // Submit the form data to the server
      try {
        const response = await kudosAPI.post<APIResponseNoData>('/account/update-details', formData.value);

        if (response.status !== 200) {
          saveError.value = 'A server error occurred while trying to update account details 💀';
          return;
        }

        const innerResponse = response.data;

        // If the update is not successful, set the error message and return
        if (innerResponse.status !== 200) {
          saveError.value = 'A server error occurred while trying to update account details 💀';
          return;
        }

        // If the update was successful, update the account store
        await accountStore.fetch();
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
  <form action.prevent class="personal-info-form">
    <header class="header">
      <h2>Personal Details</h2>
      <FormButton v-if="showSaveButton" @click="saveDetails">Save</FormButton>
    </header>
    <AccountAvatarChanger />
    <AppMessageBox v-if="displayError" type="error">
      <p>{{ displayError }}</p>
    </AppMessageBox>
    <div class="fields">
      <FormFieldText
        label="First Name"
        :error="!!formErrors.firstName"
        autocomplete="given-name"
        v-model:value="formData.firstName"
      />
      <FormFieldText
        label="Last Name"
        :error="!!formErrors.lastName"
        autocomplete="family-name"
        v-model:value="formData.lastName"
      />
    </div>
  </form>
</template>

<style lang="scss" scoped>
  .personal-info-form {
    padding: 1rem 0;
    margin-bottom: 0.5rem;

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
