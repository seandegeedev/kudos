<template>
  <div class="admin page-basic">
    <header class="header">
      <h1 class="header-title">Kudos Admin</h1>
      <div class="admin-tabs"></div>
    </header>
    <main class="main">
      <NuxtPage />
    </main>
  </div>
</template>

<style lang="scss" scoped>
  .header-title {
    font-size: 1.4rem;
  }

  .admin-tabs {
  }

  .main {
    max-width: 80rem;
    overflow-y: auto;
    padding-right: 1rem;
    width: 100%;

    justify-self: center;
  }
</style>
