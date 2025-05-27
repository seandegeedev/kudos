<script lang="ts" setup>
  const route = useRoute();

  const currentPage = computed(() => {
    return route.path.split('/').pop();
  });
</script>

<template>
  <nav class="users-submenu">
    <NuxtLink
      to="/app/admin/users/invitations"
      :class="['users-submenu-tab', { 'users-submenu-tab__selected': currentPage === 'invitations' }]"
    >
      <icon-handshake-simple />
      <span>Invitations</span>
    </NuxtLink>
    <NuxtLink
      to="/app/admin/users/accounts"
      :class="['users-submenu-tab', { 'users-submenu-tab__selected': currentPage === 'accounts' }]"
    >
      <icon-user />
      <span>Accounts</span>
    </NuxtLink>
  </nav>
</template>

<style lang="scss" scoped>
  .users-submenu {
    padding: 0.25rem;

    display: flex;
    gap: 0.25rem;

    background-color: var(--color-background-01);
    border-radius: 0.5rem;
  }

  .users-submenu-tab {
    padding: 0.35rem 0.65rem;

    align-items: center;
    display: flex;
    gap: 0.25rem;

    border-radius: 0.3rem;
    color: var(--color-text-normal);

    transition: background-color 0.2s ease-in-out;

    &:hover {
      background-color: var(--color-background-00);
      text-decoration: none;
    }

    &.users-submenu-tab__selected {
      background-color: var(--color-background-00);
    }
  }
</style>
