<script lang="ts" setup>
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

  await runChecks();
</script>

<template>
  <main class="verify-email">
    <AppVersionHeader />
    <div class="center-content">
      <NuxtImg class="kudos-logo" src="/images/kudos-logo.svg" alt="Kudos" />
      <VerifyEmailForm />
    </div>
  </main>
</template>

<style lang="scss" scoped>
  .verify-email {
    height: 100vh;

    align-content: start;
    display: grid;
  }

  .center-content {
    margin-top: 5vh;
    max-width: 30rem;
    padding: 1rem;
    width: 100%;

    display: grid;
    gap: 1rem;
    justify-items: center;
    justify-self: center;
  }

  .kudos-logo {
    margin-bottom: 1rem;
    width: 12rem;
  }
</style>
