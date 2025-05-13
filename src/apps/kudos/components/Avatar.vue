<script lang="ts" setup>
  import useAccountStore from '@/stores/account';

  const accountStore = useAccountStore();

  const props = defineProps({
    userID: {
      type: String as PropType<string>,
      required: false,
    },
  });

  const imageElement = ref<HTMLImageElement | null>(null);
  const imageOrientation = ref<'landscape' | 'portrait' | 'square'>('square');

  const source = computed(() => {
    if (!props.userID) {
      return accountStore.avatarURL;
    }
    return '';
  });

  const scale = computed(() => {
    if (!props.userID) {
      if (!accountStore.avatar) {
        return 1;
      }

      return accountStore.avatar.scale;
    }

    return 1;
  });

  const offset = computed(() => {
    if (!props.userID) {
      if (!accountStore.avatar) {
        return { x: 0, y: 0 };
      }

      return {
        x: accountStore.avatar.offsetX,
        y: accountStore.avatar.offsetY,
      };
    }

    return { x: 0, y: 0 };
  });

  const alt = computed(() => {
    if (!props.userID) {
      return accountStore.displayName;
    }
    return '';
  });

  const imageStyle = computed(() => {
    if (!imageElement.value) {
      return {};
    }

    return {
      width: imageOrientation.value === 'portrait' || imageOrientation.value === 'square' ? '100%' : 'auto',
      height: imageOrientation.value === 'landscape' ? '100%' : 'auto',
      transform: `scale(${scale.value}) translate(${offset.value.x}%, ${offset.value.y}%)`,
    };
  });

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
</script>

<template>
  <div class="avatar">
    <img
      ref="imageElement"
      v-if="source"
      class="avatar-image"
      :src="source"
      :alt="alt"
      :style="imageStyle"
      @load="imageLoaded"
    />
  </div>
</template>

<style lang="scss" scoped>
  .avatar {
    overflow: hidden;
    width: 8rem;
    aspect-ratio: 1 / 1;

    align-items: center;
    display: flex;
    justify-content: center;

    border-radius: 50%;

    .avatar-image {
      object-fit: cover;
      object-position: center;
    }
  }
</style>
