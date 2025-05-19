<script lang="ts" setup>
  import useMessageQueueStore from '@/stores/messageQueue';
  import AppPopup from '@/components/App/Popup.vue';

  const messageQueueStore = useMessageQueueStore();

  const popup = ref<InstanceType<typeof AppPopup> | null>(null);

  const email = ref<string>('');
  const invitationID = ref<string>('');

  const invitationCreated = computed(() => {
    return invitationID.value !== '';
  });

  const open = () => {
    popup.value?.open();
  };

  const close = () => {
    invitationID.value = '';
    email.value = '';

    popup.value?.close();
  };

  const getInviteCode = async () => {
    invitationID.value = '12345678'; // Simulate an API call to get the invite code
    messageQueueStore.addMessage({
      type: 'success',
      message: `Invite code ${invitationID.value} created successfully!`,
    });
  };

  defineExpose({
    open,
  });
</script>

<template>
  <AppPopup ref="popup" @click-outside="close">
    <div class="new-invite">
      <header class="header">
        <h2 class="header-title">Invite to Kudos</h2>
        <FormButton class="header-close" type="outline" size="small" @click="close">
          <span>{{ invitationCreated ? 'Close' : 'Cancel' }}</span>
        </FormButton>
      </header>
      <template v-if="invitationCreated">
        <AdminUsersInvitationView :invitationID="invitationID" />
      </template>
      <template v-else>
        <form @submit.prevent>
          <FormFieldText label="Email" name="email" placeholder="Enter email" />
        </form>
        <div class="actions">
          <FormButton @click="getInviteCode">
            <span>Get Invite Code</span>
          </FormButton>
        </div>
      </template>
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
    padding-bottom: 0.5rem;

    align-items: flex-end;
    display: flex;
    justify-content: space-between;

    border-bottom: 1px solid var(--color-border-00);
  }

  .header-title {
    font-size: 1.2rem;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
  }
</style>
