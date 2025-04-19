<script lang="ts" setup>
  import z from 'zod';

  const code = ref('');
  const error = ref('');
  const submissionError = ref('');
  const censoredEmail = ref('s*****@seandegee.tech');

  const displayError = computed(() => {
    return error.value || submissionError.value;
  });

  const validationSchema = z.string().length(4, { message: 'Verification code incomplete ❌' });

  const validateForm = () => {
    const result = validationSchema.safeParse(code.value);

    if (result.success) {
      error.value = '';
      return true;
    } else {
      error.value = result.error.errors[0].message || '';
      return false;
    }
  };

  const submitForm = async () => {
    if (validateForm()) {
    }
  };
</script>

<template>
  <form class="verify-email-form">
    <header class="header">
      <h1>Verify your email</h1>
      <p>Almost there! 🚀</p>
    </header>
    <div class="verify-message">
      <p>
        Kudos has sent a verification code to <span class="email-text">{{ censoredEmail }}</span
        >.
      </p>
      <p>Check you inbox and input the code below to activate your account.</p>
    </div>
    <AppMessageBox v-if="displayError" type="error">
      <p>{{ displayError }}</p>
    </AppMessageBox>
    <FormFieldCode v-model:code="code" type="numeric" />
    <FormButton @click.prevent="submitForm" class="verify-button">Verify</FormButton>
    <div class="resend-message">
      <p>Didn’t receive the code? 🙄 <span class="resend-text">Resend</span> it now</p>
    </div>
  </form>
</template>

<style lang="scss" scoped>
  .verify-email-form {
    justify-items: center;
    display: grid;
    gap: 1.5rem;
  }

  .header {
    display: grid;
    gap: 1rem;

    text-align: center;
    line-height: 1.4rem;

    h1 {
      font-size: 2rem;
      font-weight: 600;
    }
  }

  .verify-message {
    text-align: center;
    line-height: 1.4rem;
  }

  .verify-button {
    max-width: 10rem;
    width: 100%;

    text-align: center;
  }
</style>
