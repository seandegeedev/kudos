<script setup lang="ts"></script>

<template>
  <main class="getting-started">
    <AppVersionHeader />
    <div class="center-content">
      <NuxtImg class="kudos-logo" src="/images/kudos-logo.svg" alt="Kudos" />
      <form action.prevent class="main-form">
        <FormFieldText label="Email" type="email" :autofocus="true" />
        <FormFieldText label="First Name" />
        <FormFieldText label="Last Name" />
        <FormFieldText label="Password" type="password" />
        <FormButton class="save-button"><span>Save</span></FormButton>
      </form>
    </div>
  </main>
</template>

<style lang="scss" scoped>
  .getting-started {
    height: 100vh;

    align-content: start;
    display: grid;
  }

  .center-content {
    margin-top: 10vh;

    display: grid;
    gap: 1rem;
    justify-items: center;
    justify-self: center;
  }

  .kudos-logo {
    width: 12rem;
  }

  .main-form {
    min-width: 23vw;
    padding: 1rem;

    display: grid;
    gap: 1rem;
  }

  .save-button {
    justify-self: end;
  }
</style>
