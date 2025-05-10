<script lang="ts" setup></script>

<template>
  <form action.prevent class="password-form">
    <header class="header">
      <h2>Password</h2>
      <FormButton>Change Password</FormButton>
    </header>
    <div class="fields">
      <FormFieldText label="Current Password" type="password" />
      <FormFieldText label="New Password" type="password" />
    </div>
  </form>
</template>

<style lang="scss" scoped>
  .password-form {
    padding: 1rem 0;

    container-type: inline-size;
    display: grid;
    gap: 1rem;
  }

  .fields {
    display: grid;
    gap: 1rem;
    grid-template-columns: minmax(auto, 25rem) minmax(auto, 25rem);
    justify-content: start;

    @container (max-width: 500px) {
      grid-template-columns: 1fr;
    }
  }

  .header {
    padding-bottom: 0.5rem;

    align-items: end;
    display: flex;
    justify-content: space-between;

    border-bottom: 1px solid var(--color-border-00);

    h2 {
      font-size: 1.2rem;
    }
  }
</style>
