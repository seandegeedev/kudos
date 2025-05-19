<script lang="ts" setup>
  import NewInvitePopup from '@/components/Admin/Users/NewInvite.vue';

  const newInvitePopup = ref<InstanceType<typeof NewInvitePopup> | null>(null);

  const openInviteModal = () => {
    newInvitePopup.value?.open();
  };
</script>

<template>
  <header class="admin-users-actions">
    <FormButton size="small" @click="openInviteModal">Invite to Kudos</FormButton>
  </header>
  <AdminUsersNewInvite ref="newInvitePopup" />
</template>

<style lang="scss" scoped>
  .admin-users-actions {
    display: flex;
    justify-content: flex-end;
  }
</style>
