import type { APIResponseNoData, APIResponseAuthVerify } from '@kudos/types-api';

export default defineNuxtRouteMiddleware(async (to, _from) => {
  const kudosAPI = useKudosAPI();

  // Handle email verification routing 📧
  if (to.path === '/emailverification') {
    const verificationToken = to.query.token;

    if (!verificationToken) return navigateTo('/login');

    await kudosAPI.post<APIResponseNoData>('/auth/emailverification', {
      token: verificationToken,
    });

    return navigateTo('/login');
  }

  // Verify that the user is authenticated 🛡️
  const authVerificationResponse = await kudosAPI.get<APIResponseAuthVerify>('/auth/verify');

  // Redirect to the /login page if the user is not authenticated, unless they are navigating to the login page or the setup page 🚪
  if (authVerificationResponse.data.status !== 200 || !authVerificationResponse.data.data) {
    if (to.path !== '/login' && to.path !== '/get-started') return navigateTo('/login');
  }

  // Redirect to the /app page if the user is authenticated and navigating to the login page🏠
  if (authVerificationResponse.data.status === 200 && authVerificationResponse.data.data) {
    if (to.path === '/login') return navigateTo('/app');
  }
});
