<script lang="ts" setup></script>

<template>
  <form action.prevent class="personal-info-form">
    <header class="header"><h2>Personal Details</h2></header>
    <AccountAvatarChanger />
    <div class="fields">
      <FormFieldText label="First Name" class="field" />
      <FormFieldText label="Last Name" class="field" />
    </div>
  </form>
</template>

<style lang="scss" scoped>
  .personal-info-form {
    padding: 1rem 0;
    margin-bottom: 0.5rem;

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

    border-bottom: 1px solid var(--color-border-00);

    h2 {
      font-size: 1.2rem;
    }
  }
</style>
