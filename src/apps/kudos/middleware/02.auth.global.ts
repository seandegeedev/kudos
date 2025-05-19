import useAccountStore from '@stores/account';

import type { APIResponseAuthVerify } from '@kudos/types-api';

export default defineNuxtRouteMiddleware(async (to, _from) => {
  const kudosAPI = useKudosAPI();
  const accountStore = useAccountStore();

  // Verify that the user is authenticated 🛡️
  const authVerificationResponse = await kudosAPI.get<APIResponseAuthVerify>('/auth/verify');

  // Redirect to the /login page if the user is not authenticated, unless they are navigating to the login page or the setup page 🚪
  if (authVerificationResponse.data.status !== 200 || !authVerificationResponse.data.data) {
    if (
      to.path !== '/login' &&
      to.path !== '/get-started' &&
      to.path !== '/forgot-password' &&
      to.path !== '/reset-password'
    )
      return navigateTo('/login');
  }

  // Redirect to the /verify-email page if the user is not verified🔑
  if (
    authVerificationResponse.data.status === 200 &&
    authVerificationResponse.data.data &&
    !authVerificationResponse.data.data.user.verified
  ) {
    if (to.path !== '/verify-email')
      return navigateTo('/verify-email?userID=' + authVerificationResponse.data.data.user.id);
  }

  // Redirect to the /app page if the user is authenticated and navigating to the login page🏠
  if (authVerificationResponse.data.status === 200 && authVerificationResponse.data.data) {
    if (to.path === '/login') return navigateTo('/app');
  }

  // Redirect to the /app/account page if the user is not an admin and navigating to the /app/admin page 🚪
  if (
    authVerificationResponse.data.status === 200 &&
    authVerificationResponse.data.data &&
    !authVerificationResponse.data.data.user.admin
  ) {
    if (to.path.includes('/app/admin')) return navigateTo('/app/account');
  }

  // Fetch the user data and store it in the account store
  await accountStore.fetch();
});
