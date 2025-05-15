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

  const source = computed(() => {
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
    if (!imageElement.value) {
      return {};
    }

    const imageWidth = imageElement.value.naturalWidth;
    const imageHeight = imageElement.value.naturalHeight;

    let imageOrientation: 'landscape' | 'portrait' | 'square' = 'square';

    if (imageWidth > imageHeight) {
      imageOrientation = 'landscape';
    } else if (imageWidth < imageHeight) {
      imageOrientation = 'portrait';
    } else {
      imageOrientation = 'square';
    }

    return {
      width: imageOrientation === 'portrait' || imageOrientation === 'square' ? '100%' : 'auto',
      height: imageOrientation === 'landscape' ? '100%' : 'auto',
      transform: `scale(${imageTransforms.value.scale}) translate(${imageTransforms.value.offsetX}%, ${imageTransforms.value.offsetY}%)`,
    };
  });
</script>

<template>
  <div class="avatar-view">
    <img ref="imageElement" v-if="source" class="avatar-image" :src="source" :alt="alt" :style="imageStyle" />
  </div>
</template>

<style lang="scss" scoped>
  .avatar-view {
    aspect-ratio: 1 / 1;
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
