<script lang="ts" setup></script>

<template>
  <form action.prevent class="email-form">
    <header class="header">
      <h2>Email</h2>
      <FormButton>Update Email</FormButton>
    </header>
    <p class="disclaimer">
      <strong>Note:</strong> Changing your email will log you out and require you to verify the new email address. A
      verification link will be sent to the new email address.
    </p>
    <div class="fields">
      <FormFieldText label="Email" />
    </div>
  </form>
</template>

<style lang="scss" scoped>
  .email-form {
    padding: 1rem 0;
    margin-bottom: 0.5rem;

    container-type: inline-size;
    display: grid;
    gap: 1rem;
  }

  .fields {
    display: grid;
    gap: 1rem;
    grid-template-columns: minmax(auto, 25rem);
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
