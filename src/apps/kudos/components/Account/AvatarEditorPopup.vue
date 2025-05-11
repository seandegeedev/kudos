<script lang="ts" setup>
  import AppPopup from '@/components/App/Popup.vue';

  const popup = ref<InstanceType<typeof AppPopup> | null>(null);

  const open = () => {
    popup.value?.open();
  };

  const verifyClose = () => {
    popup.value?.close();
  };

  defineExpose({
    open,
  });
</script>

<template>
  <AppPopup ref="popup" @click-outside="verifyClose"></AppPopup>
</template>
