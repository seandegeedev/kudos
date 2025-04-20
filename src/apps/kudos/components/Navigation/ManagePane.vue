<template>
  <div class="navigation-manage-pane">
    <header class="header">
      <p class="header-title">Manage</p>
    </header>
    <menu class="menu">
      <NuxtLink href="/app/admin" class="menu-item">Admin Console</NuxtLink>
      <NuxtLink href="/app/account" class="menu-item">Account</NuxtLink>
    </menu>
  </div>
</template>

<style lang="scss" scoped>
  .navigation-manage-pane {
    padding-top: 0.5rem;

    border-top: 1px solid var(--color-border-00);
  }

  .header-title {
    font-weight: 550;
  }

  .menu {
    display: grid;
  }
</style>
