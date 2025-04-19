<script lang="ts" setup>
  const code = ref(''); // Example code, replace with actual logic to generate or retrieve the code
</script>

<template>
  <div class="verify-email-form">
    <FormFieldCode v-model:code="code" type="numeric" />
  </div>
</template>
