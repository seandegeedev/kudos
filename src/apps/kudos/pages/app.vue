<template>
  <main class="app">
    <div class="app-content">
      <AppNavigation />
      <div class="app-screens">
        <NuxtPage />
      </div>
    </div>
    <AppOverlayPopups class="app-popup-overlays" style="z-index: 1" />
    <AppOverlayMessage class="app-popup-message" style="z-index: 2" />
  </main>
</template>

<style lang="scss" scoped>
  .app {
    height: 100vh;

    display: grid;
    grid-template-areas: 'content';
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }

  .app-content {
    height: 100%;
    padding: 1rem;

    display: grid;
    gap: 1rem;
    grid-area: content;
    grid-template-columns: auto 1fr;

    background-color: var(--color-background-01);
  }

  .app-popup-overlays,
  .app-popup-message {
    grid-area: content;
  }

  .app-screens {
    height: 100%;
    overflow: hidden;

    background-color: var(--color-background-00);
    border-radius: 0.5rem;
  }
</style>
