<script lang="ts" setup></script>

<template>
  <div class="account page">
    <header class="header">
      <h1 class="header-title">Account Information</h1>
    </header>
    <main class="main">
      <section class="details section">
        <AccountPersonalInfoForm />
      </section>
      <section class="password section">
        <AccountPasswordForm />
      </section>
      <section class="email section">
        <AccountEmailForm />
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
    font-size: 1.5rem;
  }

  .main {
    max-width: 75rem;
    overflow-y: auto;
    padding-right: 1rem;
    width: 100%;

    justify-self: center;
  }
</style>
