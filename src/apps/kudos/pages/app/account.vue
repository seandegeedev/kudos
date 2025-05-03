<script lang="ts" setup></script>

<template>
  <div class="account page">
    <header class="header">
      <h1 class="header-title">Account Information</h1>
    </header>
    <main class="main">
      <p>Account settings will be here.</p>
    </main>
  </div>
</template>

<style lang="scss" scoped>
  .account {
    padding: 2rem 3rem;

    display: grid;
    gap: 2rem;
  }

  .header-title {
    font-size: 1.75rem;
  }

  .main {
    max-width: 75rem;
    width: 100%;

    justify-self: center;
  }
</style>
