<script lang="ts" setup>
  import AccountAvatarEditorPopup from '@/components/Account/AvatarEditorPopup.vue';

  const avatarEditorPopup = ref<InstanceType<typeof AccountAvatarEditorPopup> | null>(null);

  const openAvatarEditorPopup = () => {
    avatarEditorPopup.value?.open();
  };
</script>

<template>
  <div class="avatar-changer">
    <div class="avatar-details">
      <AvatarView class="avatar" />
      <div class="avatar-label">
        <label>Profile Picture</label>
        <p class="avatar-spec">PNG, JPEG, GIF under 5MB</p>
      </div>
    </div>
    <div class="actions">
      <FormButton type="solid" size="small" @click="openAvatarEditorPopup">Change</FormButton>
      <FormButton type="outline" size="small">Remove</FormButton>
    </div>
  </div>
  <AccountAvatarEditorPopup ref="avatarEditorPopup" />
</template>

<style lang="scss" scoped>
  .avatar-changer {
    align-items: center;
    display: flex;
    justify-content: space-between;

    @container (max-width: 500px) {
      display: grid;
      gap: 1rem;
    }
  }

  .avatar {
    width: 5rem;
  }

  .avatar-details {
    display: grid;
    gap: 1rem;
    grid-template-columns: auto 1fr;
  }

  .avatar-label {
    align-self: center;
    display: grid;
    gap: 0.25rem;
  }

  .avatar-spec {
    color: var(--color-text-muted);

    font-size: 0.9rem;
  }

  .actions {
    display: flex;
    gap: 0.5rem;
  }
</style>
