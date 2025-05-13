<template>
  <div class="lightbox" @click.self="$emit('clickOutside')">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
  .lightbox {
    height: 100%;
    padding: 1rem;

    display: grid;
    place-content: center;

    background: rgba(0, 0, 0, 0.411);

    pointer-events: all;

    animation: fade-in 0.2s ease-in-out forwards;

    @keyframes fade-in {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }
</style>
