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

  const userData = ref<{
    id: string;
    created: Date;
    archived: boolean;
    email: string;
    verified: boolean;
    firstName: string;
    lastName: string;
    avatar: string;
    admin: boolean;
  }>();
  const code = ref('');
  const error = ref('');
  const submissionError = ref('');

  const displayError = computed(() => {
    return error.value || submissionError.value;
  });

  const validationSchema = z.string().length(4, { message: 'Verification code incomplete ❌' });

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

  await runChecks();
</script>

<template>
  <form class="verify-email-form">
    <header class="header">
      <h1>Verify your email</h1>
    </header>

    <AppMessageBox class="verify-message">
      <p>
        Hey, {{ userData?.firstName }}. Kudos has sent a verification code to
        <span class="email-text">{{ userData?.email }}</span
        >.
      </p>
      <p>Check you inbox and input the code below to activate your account.</p>
    </AppMessageBox>
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

    line-height: 1.4rem;

    h1 {
      font-size: 2rem;
      font-weight: 500;
    }
  }

  .verify-message {
    text-align: center;
    text-wrap: pretty;
    line-height: 1.4rem;
  }

  .verify-button {
    max-width: 10rem;
    width: 100%;

    text-align: center;
  }
</style>
