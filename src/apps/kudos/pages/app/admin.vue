<template>
  <div class="admin page-basic">
    <header class="header">
      <h1 class="header-title">Kudos Admin</h1>
      <div class="admin-tabs">
        <div class="admin-tab admin-tab__selected">
          <icon-users />
          <span>Users</span>
        </div>
        <div class="admin-tab">
          <icon-realm filled />
          <span>Realms</span>
        </div>
        <div class="admin-tab">
          <icon-champagne-glasses />
          <span>Social</span>
        </div>
      </div>
    </header>
    <main class="main">
      <NuxtPage />
    </main>
  </div>
</template>

<style lang="scss" scoped>
  .header {
    align-items: center;
    gap: 1rem;
    display: grid;
    grid-template-columns: auto 1fr;
  }

  .header-title {
    font-size: 1.4rem;
  }

  .admin-tabs {
    padding: 0.25rem;

    display: flex;
    gap: 0.25rem;

    background-color: var(--color-background-01);
    border-radius: 0.5rem;
    cursor: pointer;
  }

  .admin-tab {
    padding: 0.25rem 0.65rem;

    align-items: center;
    display: flex;
    gap: 0.25rem;

    border-radius: 0.3rem;

    &.admin-tab__selected {
      background-color: var(--color-background-00);
    }
  }

  .main {
    max-width: 80rem;
    overflow-y: auto;
    padding-right: 1rem;
    width: 100%;

    justify-self: center;
  }
</style>
