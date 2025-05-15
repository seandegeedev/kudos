<script lang="ts" setup>
  import useAccountStore from '@/stores/account';
  import useMessageQueueStore from '@/stores/messageQueue';
  import AppPopup from '@/components/App/Popup.vue';

  const accountStore = useAccountStore();
  const kudosAPI = useKudosAPI();
  const messageQueueStore = useMessageQueueStore();

  const imageElement = ref<HTMLImageElement | null>(null);
  const uploadedImage = ref<File | null>(null);
  const imageWrapperElement = ref<HTMLDivElement | null>(null);
  const popup = ref<InstanceType<typeof AppPopup> | null>(null);

  const uploadedImageSrc = ref<string | null>(null);
  const imageOrientation = ref<'landscape' | 'portrait' | 'square'>('square');
  const saveError = ref('');

  const currentTransform = ref({
    x: 0,
    y: 0,
    scale: 1,
  });

  const currentCursorPosition = ref({
    x: 0,
    y: 0,
  });

  const imageSource = computed(() => {
    if (!uploadedImageSrc.value) {
      return accountStore.avatarURL;
    }
    return uploadedImageSrc.value;
  });

  const imageStyle = computed(() => {
    if (!imageElement.value) {
      return {};
    }

    return {
      width: imageOrientation.value === 'portrait' || imageOrientation.value === 'square' ? '100%' : 'auto',
      height: imageOrientation.value === 'landscape' ? '100%' : 'auto',
    };
  });

  const showSaveButton = computed(() => {
    return !!uploadedImageSrc.value;
  });

  const open = () => {
    popup.value?.open();
  };

  const verifyClose = () => {
    popup.value?.close();
  };

  const selectFile = () => {
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
          uploadedImageSrc.value = event.target?.result as string;
        };
        reader.readAsDataURL(file);
      }
    };
  };

  const cancelImageSelection = () => {
    uploadedImageSrc.value = null;
  };

  const saveAvatar = async () => {
    if (uploadedImage.value) {
      const formData = new FormData();
      formData.append('avatar', uploadedImage.value);

      try {
        const response = await kudosAPI.post('/media/account/avatar/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status !== 200) {
          saveError.value = 'A server error occurred while trying to update account details 💀';
          return;
        }

        const innerResponse = response.data;

        if (innerResponse.status !== 200) {
          saveError.value = 'A server error occurred while trying to update the avatar 💀';
          return;
        }

        await accountStore.fetch();

        uploadedImageSrc.value = null;
        uploadedImage.value = null;

        messageQueueStore.addMessage({
          type: 'success',
          message: 'Your account avatar has been updated successfully💪',
        });
      } catch (error) {
        saveError.value = 'Failed to upload image. Please try again.';
      }
    }
  };

  const imageLoaded = () => {
    if (!imageElement.value) {
      return;
    }

    const imageWidth = imageElement.value.naturalWidth;
    const imageHeight = imageElement.value.naturalHeight;

    if (imageWidth > imageHeight) {
      imageOrientation.value = 'landscape';
    } else if (imageWidth < imageHeight) {
      imageOrientation.value = 'portrait';
    } else {
      imageOrientation.value = 'square';
    }
  };

  defineExpose({
    open,
  });
</script>

<template>
  <AppPopup ref="popup" @click-outside="verifyClose">
    <div class="avatar-editor">
      <div class="top-actions">
        <p class="reset" @click="cancelImageSelection">Reset</p>
        <icon-xmark class="close-button" @click="verifyClose" />
      </div>
      <div class="avatar-box">
        <div ref="imageWrapperElement" class="avatar-image-wrapper">
          <img
            ref="imageElement"
            :src="imageSource"
            :alt="accountStore.displayName"
            :style="imageStyle"
            @dragstart.prevent
            @load="imageLoaded"
          />
        </div>
        <div class="avatar-circle-overlay">
          <FormButton size="small" class="change-button" @click="selectFile">
            <icon-pen />
            <span>Change</span>
          </FormButton>
        </div>
      </div>
      <div class="controls"></div>
      <div class="actions">
        <FormButton v-if="showSaveButton" class="action-button" @click="saveAvatar">Save</FormButton>
      </div>
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

  .top-actions {
    align-items: center;
    display: flex;
    gap: 1rem;
    justify-content: end;
  }

  .reset {
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

  .avatar-box {
    aspect-ratio: 1;
    width: 20rem;

    display: grid;
    grid-template-areas: 'content';
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;

    background-color: var(--color-background-01);
  }

  .avatar-circle-overlay {
    height: 100%;
    padding: 1rem;
    z-index: 1;

    align-items: end;
    display: grid;
    grid-area: content;
    justify-content: end;

    background: radial-gradient(circle at center, transparent 70.5%, var(--color-background-00) calc(70.5% + 1px));

    pointer-events: none;
  }

  .avatar-image-wrapper {
    height: 100%;
    overflow: hidden;

    align-items: center;
    display: flex;
    grid-area: content;
    justify-content: center;

    background-color: aqua;

    img {
      max-width: none;
      object-fit: cover;
      object-position: center;
    }
  }

  .change-button {
    display: flex;
    gap: 0.25rem;

    pointer-events: all;
  }

  .actions {
    display: grid;
  }

  .action-button {
    justify-content: center;
  }
</style>
