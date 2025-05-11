<script lang="ts" setup>
  const isOpen = ref(false);

  const close = () => {
    isOpen.value = false;
  };

  const open = () => {
    isOpen.value = true;
  };

  const emit = defineEmits(['clickOutside']);

  defineExpose({
    open,
    close,
  });
</script>

<template>
  <ClientOnly v-if="isOpen">
    <Teleport to="#popup-teleport"
      ><AppOverlayLightBox @clickOutside="emit('clickOutside')"><slot /></AppOverlayLightBox
    ></Teleport>
  </ClientOnly>
</template>
