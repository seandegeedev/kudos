<script lang="ts" setup>
  import useAccountStore from '@/stores/account';

  const accountStore = useAccountStore();
</script>

<template>
  <div class="navigation-manage-pane">
    <header class="header">
      <p class="header-title">Manage</p>
    </header>
    <menu class="menu">
      <NuxtLink href="/app/account" class="menu-item">
        <AvatarView class="account-avatar" />
        <span>Account</span>
      </NuxtLink>
      <div class="seperator"></div>
    </menu>
    <NuxtLink v-if="accountStore.admin" href="/app/admin" class="menu-item">
      <icon-user-crown />
      <span>Kudos Admin</span>
    </NuxtLink>
    <div class="logout-section">
      <NuxtLink href="/logout" class="menu-item">
        <icon-right-from-bracket />
        <span>Log out</span>
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .navigation-manage-pane {
    min-height: 12rem;
    padding-top: 0.5rem;

    align-content: start;
    display: grid;
    grid-template-rows: auto 1fr auto;
    gap: 0.5rem;

    border-top: 1px solid var(--color-border-00);
  }

  .header-title {
    font-size: 1.15rem;
  }

  .menu {
    align-content: start;
    display: grid;
  }

  .menu-item {
    padding: 0.75rem;

    align-items: center;
    display: flex;
    gap: 0.5rem;

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

  .seperator {
    height: 1px;
    margin: 0 0.75rem;

    background-color: var(--color-border-00);
  }
</style>
