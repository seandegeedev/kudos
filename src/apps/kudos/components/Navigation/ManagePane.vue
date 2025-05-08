<template>
  <div class="navigation-manage-pane">
    <header class="header">
      <p class="header-title">Manage</p>
    </header>
    <menu class="menu">
      <NuxtLink href="/app/account" class="menu-item">
        <Avatar class="account-avatar" />
        <span>Account</span>
      </NuxtLink>
    </menu>
  </div>
</template>

<style lang="scss" scoped>
  .navigation-manage-pane {
    min-height: 12rem;
    padding-top: 0.5rem;

    align-content: start;
    display: grid;
    gap: 0.5rem;

    border-top: 1px solid var(--color-border-00);
  }

  .header-title {
    font-size: 1.15rem;
  }

  .menu {
    display: grid;
  }

  .menu-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    padding: 0.5rem 0.75rem;
    border-radius: 0.5rem;

    color: var(--color-text-01);
    text-decoration: none;

    &:hover {
      background-color: var(--color-background-00);
      color: var(--color-text-00);
    }
  }

  .menu-item-icon {
    font-size: 1.3rem;
  }

  .account-avatar {
    width: 2rem;
  }
</style>
