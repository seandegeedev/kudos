<script lang="ts" setup>
  import z from 'zod';
  import type { APIResponseUserVerify } from '@kudos/types-api';

  const route = useRoute();
  const router = useRouter();

  const kudosAPI = useKudosAPI();

  const userID = route.query.userID as string;

  // If userID is not present in the query parameters, redirect to the app page
  if (!userID) {
    router.push({ name: 'app' });
  }

  const autoVerify = ref(true);
  const userData = ref<{
    id: string;
    created: Date;
    archived: boolean;
    email: string;
    verified: boolean;
    firstName: string;
    lastName: string;
    admin: boolean;
  }>();
  const code = ref('');
  const error = ref('');
  const submissionError = ref('');
  const message = ref('');

  const displayError = computed(() => {
    return error.value || submissionError.value;
  });

  const validationSchema = z.string().length(4, { message: 'Verification code incomplete ❌' });

  // Automatically submit the form when the code is complete
  watch(code, newValue => {
    if (autoVerify.value && newValue.length === 4) {
      autoVerify.value = false; // Prevent auto-submit on subsequent changes
      submitForm();
    }
  });

  const runChecks = async () => {
    // Check if the userID is valid
    const userCheckResponse = await kudosAPI.post<APIResponseUserVerify>('/auth/verify-user', {
      userID,
    });

    // User not found or invalid userID
    if (userCheckResponse.data.status !== 200 || !userCheckResponse.data.data) {
      router.push({ name: 'app' });
      return;
    }

    const user = userCheckResponse.data.data.user;

    // Check if the user is already verified
    if (user.verified) {
      router.push({ name: 'app' });
      return;
    }

    userData.value = user;
  };

  const validateForm = () => {
    message.value = '';
    submissionError.value = '';
    error.value = '';

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
    if (!validateForm()) {
      return;
    }

    const response = await kudosAPI.post('/auth/verify-email', {
      userID,
      code: code.value,
    });

    if (response.data.status === 200) {
      router.push({ name: 'app' });
    } else {
      submissionError.value = response.data.message || 'Verification failed 💀 Please try again.';
    }
  };

  const resendConfirmationEmail = async () => {
    console.log('Resending confirmation email...');
    const response = await kudosAPI.get('/auth/send-email-verification');

    console.log('Response:', response);

    if (response.data.status !== 200) {
      submissionError.value = 'Failed to resend verification email. Please try again.';
    } else {
      submissionError.value = '';
      message.value = 'Verification email resent 💪 Check your inbox 📩';
    }
  };

  const signOut = async () => {
    const response = await kudosAPI.get('/auth/logout');

    if (response.data.status === 200) {
      router.push({ name: 'login' });
    } else {
      submissionError.value = 'Failed to sign out. Please try again.';
    }
  };

  await runChecks();
</script>

<template>
  <form class="verify-email-form" v-if="userData">
    <header class="header">
      <h1>Verify your email</h1>
    </header>

    <AppMessageBox class="verify-message">
      <p>
        Hey, {{ userData?.firstName }} 👋 Kudos has sent a verification code to
        <span class="email-text">{{ userData?.email }}</span
        >.
      </p>
      <p>Check you inbox and input the code below to activate your account.</p>
    </AppMessageBox>
    <AppMessageBox v-if="displayError" type="error">
      <p>{{ displayError }}</p>
    </AppMessageBox>
    <AppMessageBox v-if="message">
      <p>{{ message }}</p>
    </AppMessageBox>
    <FormFieldCode v-model:code="code" type="numeric" />
    <div class="actions">
      <FormButton @click.prevent="submitForm" class="verify-button">Verify</FormButton>
      <span class="sign-out" @click="signOut">Sign out</span>
    </div>
    <div class="resend-message">
      <p>Didn’t receive the code? 🙄 <span class="resend-text" @click="resendConfirmationEmail">Resend</span> it now</p>
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

    line-height: 1.4rem;

    h1 {
      font-size: 2rem;
      font-weight: 500;
    }
  }

  .email-text {
    font-weight: 500;
    color: var(--color-accent-00);
  }

  .verify-message {
    text-align: center;
    text-wrap: pretty;
    line-height: 1.4rem;
  }

  .actions {
    width: 100%;

    display: flex;
    justify-content: space-between;
    align-items: end;
  }

  .sign-out {
    color: var(--color-text-muted);
    cursor: pointer;

    text-decoration: underline;

    &:hover {
      text-decoration: none;
      color: var(--color-accent-00);
    }
  }

  .verify-button {
    width: 7rem;

    text-align: center;
  }

  .resend-text {
    cursor: pointer;
    font-weight: 500;
    text-decoration: underline;

    &:hover {
      text-decoration: none;
      color: var(--color-accent-00);
    }
  }
</style>
