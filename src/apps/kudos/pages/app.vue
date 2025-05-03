<template>
  <main class="app">
    <AppNavigation />
    <div class="app-screens">
      <NuxtPage />
    </div>
  </main>
</template>

<style lang="scss" scoped>
  .app {
    height: 100vh;
    padding: 1rem;

    display: grid;
    grid-template-columns: auto 1fr;
    gap: 1rem;
    background-color: var(--color-background-01);
  }

  .app-screens {
    background-color: var(--color-background-00);
    border-radius: 0.5rem;
  }
</style>
