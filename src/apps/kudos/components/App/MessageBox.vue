<template>
  <article class="message-box">
    <slot />
  </article>
</template>

<style lang="scss" scoped>
  .message-box {
    padding: 1rem;
    width: 100%;

    background-color: var(--color-background-01);
    border: 1px solid var(--color-border-00);
    border-radius: 0.5rem;
  }
</style>
