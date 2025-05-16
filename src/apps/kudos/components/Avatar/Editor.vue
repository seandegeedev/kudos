<script lang="ts" setup>
  import useAccountStore from '@/stores/account';
  import useMessageQueueStore from '@/stores/messageQueue';
  import AppPopup from '@/components/App/Popup.vue';

  const kudosAPI = useKudosAPI();
  const accountStore = useAccountStore();
  const messageQueueStore = useMessageQueueStore();

  const props = defineProps({
    userID: {
      type: String as PropType<string>,
      required: false,
    },
    domainID: {
      type: String as PropType<string>,
      required: false,
    },
  });

  const popup = ref<InstanceType<typeof AppPopup> | null>(null);

  const uploadedImage = ref<File | null>(null);
  const uploadedImageURL = ref<string | null>(null);

  const originalTransform = ref({
    x: 0,
    y: 0,
    scale: 1,
  });

  const currentTransform = ref({
    x: 0,
    y: 0,
    scale: 1,
  });

  const saveError = ref('');

  const avatarType = computed(() => {
    if (props.userID) {
      if (props.domainID) {
        return 'user-domain';
      }

      return 'user';
    }

    if (props.domainID) {
      return 'account-domain';
    }

    return 'account';
  });

  const imageSource = computed(() => {
    if (uploadedImageURL.value) {
      return uploadedImageURL.value;
    }

    if (avatarType.value === 'account') {
      return accountStore.avatarURL;
    }

    return '';
  });

  const showSaveButton = computed(() => {
    return (
      !!uploadedImageURL.value ||
      originalTransform.value.x !== currentTransform.value.x ||
      originalTransform.value.y !== currentTransform.value.y ||
      originalTransform.value.scale !== currentTransform.value.scale
    );
  });

  const open = () => {
    popup.value?.open();
  };

  const verifyClose = () => {
    popup.value?.close();
  };

  const selectImage = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();

    input.onchange = e => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        uploadedImage.value = file;

        const reader = new FileReader();
        reader.onload = event => {
          currentTransform.value = {
            x: 0,
            y: 0,
            scale: 1,
          };

          uploadedImageURL.value = event.target?.result as string;
        };
        reader.readAsDataURL(file);
      }
    };
  };

  const save = async () => {
    switch (avatarType.value) {
      case 'account':
        await saveAccountAvatar();
        break;
      case 'account-domain':
        await saveAccountDomainAvatar();
        break;
      case 'user':
        await saveUserAvatar();
        break;
      case 'user-domain':
        await saveUserDomainAvatar();
        break;
    }
  };

  const saveAccountAvatar = async () => {
    try {
      // Upload the avatar if it has been changed
      if (uploadedImage.value) {
        const formData = new FormData();
        formData.append('avatar', uploadedImage.value);

        const uploadResponse = await kudosAPI.post('/media/account/avatar/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (uploadResponse.status !== 200) {
          saveError.value = 'A server error occurred while trying to upload avatar 💀';
          return;
        }

        const innerUploadResponse = uploadResponse.data;

        if (innerUploadResponse.status !== 200) {
          saveError.value = 'A server error occurred while trying to upload avatar 💀';
          return;
        }
      }

      // Save the avatar transform values
      const transformResponse = await kudosAPI.post('/media/account/avatar/adjust', {
        offsetX: currentTransform.value.x,
        offsetY: currentTransform.value.y,
        scale: currentTransform.value.scale,
      });

      if (transformResponse.status !== 200) {
        saveError.value = 'A server error occurred while trying to update avatar transforms 💀';
        return;
      }

      const innerTransformResponse = transformResponse.data;

      if (innerTransformResponse.status !== 200) {
        saveError.value = 'A server error occurred while trying to update avatar transforms 💀';
        return;
      }

      await accountStore.fetch();

      await fetchOriginalTransform();

      uploadedImageURL.value = null;
      uploadedImage.value = null;

      messageQueueStore.addMessage({
        type: 'success',
        message: 'Your account avatar has been updated successfully💪',
      });
    } catch (error) {
      saveError.value = 'Failed to upload image. Please try again.';
    }
  };

  // TODO
  const saveAccountDomainAvatar = async () => {};

  // TODO
  const saveUserAvatar = async () => {};

  // TODO
  const saveUserDomainAvatar = async () => {};

  const fetchOriginalTransform = async () => {
    switch (avatarType.value) {
      case 'account':
        // Fetch the original transform values from the account store
        originalTransform.value = getAccountAvatarTransform();

        // Set the current transform to the original transform
        currentTransform.value = originalTransform.value;
        break;
      case 'account-domain':
        //originalTransform.value = await getAccountDomainAvatarTransform();
        break;
      case 'user':
        //originalTransform.value = await getUserAvatarTransform();
        break;
      case 'user-domain':
        //originalTransform.value = await getUserDomainAvatarTransform();
        break;
    }
  };

  const getAccountAvatarTransform = () => {
    return {
      x: accountStore.avatar?.offsetX || 0,
      y: accountStore.avatar?.offsetY || 0,
      scale: accountStore.avatar?.scale || 1,
    };
  };

  // TODO
  const getAccountDomainAvatarTransform = async () => {};

  // TODO
  const getUserAvatarTransform = async () => {};

  // TODO
  const getUserDomainAvatarTransform = async () => {};

  const cancelImageSelection = () => {
    uploadedImage.value = null;
    uploadedImageURL.value = null;

    currentTransform.value = originalTransform.value;
  };

  // Get initial transform values before the component is mounted
  onMounted(async () => {
    await fetchOriginalTransform();
  });

  defineExpose({
    open,
  });
</script>

<template>
  <AppPopup ref="popup" @click-outside="verifyClose">
    <div class="avatar-editor">
      <div class="avatar-actions">
        <p class="reset-button" @click="cancelImageSelection">Reset</p>
        <icon-xmark class="close-button" @click="verifyClose" />
      </div>
      <div class="transformer-wrapper">
        <AvatarTransformer :src="imageSource" v-model:transform="currentTransform" class="avatar-transformer" />
        <FormButton size="small" class="change-button" @click="selectImage">
          <icon-pen />
          <span>Change</span>
        </FormButton>
      </div>
      <FormButton v-if="showSaveButton" class="save-button" @click="save">Save</FormButton>
    </div>
  </AppPopup>
</template>

<style lang="scss" scoped>
  .avatar-editor {
    padding: 0.5rem 1.5rem 1.5rem 1.5rem;

    display: grid;
    gap: 1rem;
    grid-template-rows: auto 1fr auto;

    background-color: var(--color-background-00);
    border-radius: 0.5rem;
  }

  .avatar-actions {
    align-items: center;
    display: flex;
    gap: 1rem;
    justify-content: end;
  }

  .transformer-wrapper {
    display: grid;
    grid-template-areas: 'content';
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }

  .avatar-transformer {
    width: 20rem;

    grid-area: content;
  }

  .change-button {
    margin: 1rem;
    z-index: 1;

    align-self: end;
    display: flex;
    gap: 0.25rem;
    grid-area: content;
    justify-self: end;
  }

  .reset-button {
    color: var(--color-text-muted);
    cursor: pointer;

    font-weight: 500;
    text-decoration: underline;
    text-underline-offset: 0.2rem;

    &:hover {
      color: var(--color-text-normal);
    }
  }

  .close-button {
    cursor: pointer;

    color: var(--color-text-muted);

    &:hover {
      color: var(--color-text-normal);
    }
  }

  .save-button {
    justify-content: center;
  }
</style>
