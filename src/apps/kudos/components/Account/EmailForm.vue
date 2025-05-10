<script lang="ts" setup></script>

<template>
  <form action.prevent class="email-form">
    <p class="disclaimer"></p>
    <div class="fields">
      <FormFieldText label="Email" />
    </div>
  </form>
</template>

<style lang="scss" scoped>
  .email-form {
    padding: 1rem 0;
    margin-bottom: 1rem;

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
</style>
