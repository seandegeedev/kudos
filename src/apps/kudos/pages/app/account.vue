<script lang="ts" setup></script>

<template>
  <div class="account page-basic">
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
  .header-title {
    font-size: 1.4rem;
  }

  .main {
    max-width: 80rem;
    overflow-y: auto;
    padding-right: 1rem;
    width: 100%;

    justify-self: center;
  }
</style>
