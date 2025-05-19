export default defineNuxtRouteMiddleware(async (to, _from) => {
  // Redirect to /app/account if the user is trying to access the home page 🏠
  if (to.path === '/' || to.path === '/app') {
    return navigateTo('/app/account');
  }

  if (to.path === '/app/admin') {
    return navigateTo('/app/admin/users');
  }
});
