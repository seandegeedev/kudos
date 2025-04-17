<script lang="ts" scoped></script>

<template>
  <form action.prevent class="getting-started-form">
    <FormFieldText label="Email" type="email" :autofocus="true" />
    <FormFieldText label="First Name" />
    <FormFieldText label="Last Name" />
    <FormFieldText label="Password" type="password" />
    <FormButton class="save-button"><span>Save</span></FormButton>
  </form>
</template>

<style lang="scss" scoped>
  .getting-started-form {
    width: 100%;

    display: grid;
    gap: 1rem;
  }

  .save-button {
    justify-self: end;
  }
</style>
