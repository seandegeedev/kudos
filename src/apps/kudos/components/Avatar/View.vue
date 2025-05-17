<script lang="ts" setup>
  import useAccountStore from '@/stores/account';

  const accountStore = useAccountStore();

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

  const imageElement = ref<HTMLImageElement | null>(null);

  const imageOrientation = ref<'landscape' | 'portrait' | 'square'>('square');

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
    if (avatarType.value === 'account') {
      return accountStore.avatarURL;
    }

    return null;
  });

  const alt = computed(() => {
    if (avatarType.value === 'account') {
      return accountStore.displayName;
    }

    return '';
  });

  const imageTransforms = computed(() => {
    if (avatarType.value === 'account') {
      return {
        scale: accountStore.avatar?.scale || 1,
        offsetX: accountStore.avatar?.offsetX || 0,
        offsetY: accountStore.avatar?.offsetY || 0,
      };
    }

    return {
      scale: 1,
      offsetX: 0,
      offsetY: 0,
    };
  });

  const imageStyle = computed(() => {
    return {
      width: imageOrientation.value === 'portrait' || imageOrientation.value === 'square' ? '100%' : 'auto',
      height: imageOrientation.value === 'landscape' ? '100%' : 'auto',
      transform: `scale(${imageTransforms.value.scale}) translate(${imageTransforms.value.offsetX}%, ${imageTransforms.value.offsetY}%)`,
    };
  });

  const onImageLoad = async () => {
    if (!imageElement.value) {
      return {};
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
</script>

<template>
  <div class="avatar-view">
    <img
      ref="imageElement"
      v-if="imageSource"
      class="avatar-image"
      :src="imageSource"
      :alt="alt"
      :style="imageStyle"
      @load="onImageLoad"
    />
  </div>
</template>

<style lang="scss" scoped>
  .avatar-view {
    aspect-ratio: 1;
    overflow: hidden;
    width: 8rem;

    align-items: center;
    display: flex;
    justify-content: center;

    border-radius: 50%;
  }

  .avatar-image {
    max-width: none;
    object-fit: cover;
    object-position: center;
  }
</style>
