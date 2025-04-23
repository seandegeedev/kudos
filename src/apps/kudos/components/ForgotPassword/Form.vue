<script lang="ts" setup>
  const emailAddress = ref('');
  const message = ref('Ai... Enter your email address and we will send you a link to reset your password.');
  const submitted = ref(false);
  const formError = ref('');
  const submissionError = ref('');

  const displayError = computed(() => {
    return Object.values(formError.value).find(error => error !== '') || submissionError.value;
  });

  const submitForm = async () => {};
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
    <FormFieldText label="Email" type="email" :autofocus="true" :error="!!formError" v-model:value="emailAddress" />
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
