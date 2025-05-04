<script lang="ts" setup></script>

<template>
  <div class="account page">
    <header class="header">
      <h1 class="header-title">Account Information</h1>
    </header>
    <main class="main">
      <section class="details section">
        <header class="section-header"><h2>Personal Details</h2></header>
      </section>
      <section class="password section">
        <header class="section-header"><h2>Password</h2></header>
      </section>
      <section class="email section">
        <header class="section-header"><h2>Email</h2></header>
      </section>
    </main>
  </div>
</template>

<style lang="scss" scoped>
  .account {
    height: 100%;
    overflow: hidden;

    padding: 2rem 3rem;

    align-content: start;
    display: grid;
    gap: 2rem;
  }

  .header-title {
    font-size: 1.75rem;
  }

  .main {
    max-width: 75rem;
    overflow-y: auto;
    padding-right: 1rem;
    width: 100%;

    justify-self: center;
  }

  .section {
    min-height: 10rem;
  }

  .section-header {
    padding-bottom: 0.5rem;

    border-bottom: 1px solid var(--color-border-00);

    h2 {
      font-size: 1.3rem;
    }
  }
</style>
