<script lang="ts" setup>
  import z from 'zod';

  const liveValidate = ref(false);

  const validationSchema = z.object({
    email: z
      .string()
      .email({ message: 'Invalid email address 💀' })
      .nonempty({ message: 'All fields are required 🙄' }),
    firstName: z.string().nonempty({ message: 'All fields are required 🙄' }),
    lastName: z.string().nonempty({ message: 'All fields are required 🙄' }),
    password: z
      .string()
      .min(8, { message: 'Password should contain at least 8 characters 🔑' })
      .max(100, { message: 'Password can only contain at most 100 characters 🔑' }),
  });

  const formData = ref({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  });

  const formErrors = ref({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  });

  // This function is called when the form is submitted or when liveValidate is enabled
  // and the user types in the form fields
  const validateForm = () => {
    liveValidate.value = true;

    const result = validationSchema.safeParse(formData.value);

    if (result.success) {
      formErrors.value = {
        email: '',
        firstName: '',
        lastName: '',
        password: '',
      };
      return true;
    } else {
      formErrors.value = {
        email: result.error.formErrors.fieldErrors.email?.[0] || '',
        firstName: result.error.formErrors.fieldErrors.firstName?.[0] || '',
        lastName: result.error.formErrors.fieldErrors.lastName?.[0] || '',
        password: result.error.formErrors.fieldErrors.password?.[0] || '',
      };
      return false;
    }
  };

  const displayError = computed(() => {
    return Object.values(formErrors.value).find(error => error !== '');
  });

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
    }
  };
</script>

<template>
  <form action.prevent class="getting-started-form">
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
    <FormFieldText label="First Name" :error="!!formErrors.firstName" v-model:value="formData.firstName" />
    <FormFieldText label="Last Name" :error="!!formErrors.lastName" v-model:value="formData.lastName" />
    <FormFieldText label="Password" type="password" :error="!!formErrors.password" v-model:value="formData.password" />
    <FormButton class="save-button" @click="submitForm"><span>Save</span></FormButton>
  </form>
</template>

<style lang="scss" scoped>
  .getting-started-form {
    width: 100%;

    display: grid;
    gap: 1rem;
  }

  .save-button {
    justify-self: end;
  }
</style>
