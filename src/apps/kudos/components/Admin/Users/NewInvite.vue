<script lang="ts" setup>
  import useMessageQueueStore from '@/stores/messageQueue';
  import AppPopup from '@/components/App/Popup.vue';

  const messageQueueStore = useMessageQueueStore();

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
  <AppPopup ref="popup" @click-outside="verifyClose">
    <div class="new-invite">
      <header class="header">
        <h2 class="header-title">Invite to Kudos</h2>
        <FormButton class="header-close" type="outline" size="small" @click="verifyClose">
          <span>Cancel</span>
        </FormButton>
      </header>
    </div>
  </AppPopup>
</template>

<style lang="scss" scoped>
  .new-invite {
    min-width: 25rem;
    padding: 1rem;

    display: grid;
    gap: 1rem;

    grid-template-rows: auto 1fr auto;

    background-color: var(--color-background-00);
    border-radius: 0.5rem;
  }

  .header {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  .header-title {
    font-size: 1.2rem;
  }
</style>
