<template>
  <main class="getting-started">
    <AppVersionHeader />
    <div class="center-content">
      <NuxtImg class="kudos-logo" src="/images/kudos-logo.svg" alt="Kudos" />
      <GettingStartedForm />
    </div>
  </main>
</template>

<style lang="scss" scoped>
  .getting-started {
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
