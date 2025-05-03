export default defineNuxtRouteMiddleware(async (to, _from) => {
  // Redirect to /app/account if the user is trying to access the home page 🏠
  if (to.path === '/') {
    return navigateTo('/app/account');
  }
});
