import type { APIResponseStatus } from '@kudos/types-api';

export default defineNuxtRouteMiddleware(async (to, _from) => {
  const kudosAPI = useKudosAPI();

  const statusResponse = await kudosAPI.get<APIResponseStatus>('/status');

  const status = statusResponse.data.data;
  if (!status) {
    throw new Error('API server is not responding');
  }

  if (status.getStartedRequired) {
    // Redirect to get0started page if admin setup is required ✅
    if (to.path !== '/get-started') {
      return navigateTo('/get-started');
    }
  } else if (to.path === '/get-started') {
    // Redirect to home page if admin setup is not required ❌
    return navigateTo('/app');
  }
});
