<template>
  <nav class="app-navigation">
    <NuxtImg class="kudos-logo" src="/images/kudos-logo.svg" alt="Kudos" />
    <div class="navigation-panes">
      <NavigationRealmPane />
      <NavigationSocialPane />
      <NavigationManagePane />
    </div>
  </nav>
</template>

<style lang="scss" scoped>
  .app-navigation {
    display: grid;
    grid-template-rows: auto 1fr;
  }

  .kudos-logo {
    margin-bottom: 1rem;
    width: 7rem;
  }

  .navigation-panes {
    display: grid;
    grid-template-rows: 1fr 1fr auto;
  }
</style>
