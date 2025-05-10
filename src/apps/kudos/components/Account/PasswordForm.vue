<script lang="ts" setup></script>

<template>
  <form action.prevent class="password-form">
    <div class="fields">
      <FormFieldText label="Current Password" type="password" />
      <FormFieldText label="New Password" type="password" />
    </div>
  </form>
</template>

<style lang="scss" scoped>
  .password-form {
    padding: 1rem 0;
    margin-bottom: 1rem;

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
</style>
