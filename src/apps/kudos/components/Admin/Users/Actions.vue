<script lang="ts" setup>
  import NewInvitePopup from '@/components/Admin/Users/NewInvite.vue';

  const newInvitePopup = ref<InstanceType<typeof NewInvitePopup> | null>(null);

  const openInviteModal = () => {
    newInvitePopup.value?.open();
  };
</script>

<template>
  <div class="admin-users-actions">
    <header class="header">
      <h2 class="header-title">Quick Actions</h2>
    </header>
    <div class="actions">
      <FormButton size="small" @click="openInviteModal" class="invite-button">
        <icon-handshake-simple />
        <span>Invite to Kudos</span>
      </FormButton>
    </div>
  </div>
  <AdminUsersNewInvite ref="newInvitePopup" />
</template>

<style lang="scss" scoped>
  .admin-users-actions {
    display: grid;
    gap: 1rem;
  }

  .header {
    padding-bottom: 0.25rem;
    border-bottom: 1px solid var(--color-border-00);
  }

  .header-title {
    font-size: 1.2rem;
  }

  .actions {
    display: flex;
  }

  .invite-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
</style>
