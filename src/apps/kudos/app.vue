<script lang="ts" setup>
  const welcomeMessage = useKudosWelcomeMessage();

  welcomeMessage.display();
</script>

<template>
  <NuxtPage />
</template>

<style lang="scss">
  @use '@/assets/style/index.scss';
</style>
