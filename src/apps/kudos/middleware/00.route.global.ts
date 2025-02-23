export default defineNuxtRouteMiddleware(async (to, _from) => {
  // Redirect to /app if the user is trying to access the home page 🏠
  if (to.path === '/' || to.path === '/app') {
    return navigateTo('/app/account/profile');
  }

  // Redirect to /app/account/profile if the user is trying to access the /app/account page 🎣
  if (to.path === '/app/account') {
    return navigateTo('/app/account/profile');
  }
});
