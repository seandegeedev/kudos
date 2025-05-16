<script lang="ts" setup>
  const transform = defineModel<{
    x: number;
    y: number;
    scale: number;
  }>('transform', { required: true });

  defineProps({
    src: {
      type: String,
      required: true,
    },
  });

  const imageElement = ref<HTMLImageElement | null>(null);
  const imageWrapperElement = ref<HTMLDivElement | null>(null);

  const currentCursorPosition = ref({
    x: 0,
    y: 0,
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
      transform: `scale(${transform.value?.scale || 1}) translate(${transform.value?.x || 0}%, ${
        transform.value?.y || 0
      }%)`,
    };
  });

  const zoom = (event: WheelEvent) => {
    if (!imageElement.value) {
      return;
    }

    const delta = event.deltaY > 0 ? -0.1 : 0.1;

    transform.value = {
      ...transform.value,
      scale: Math.max(1, Math.min(5, transform.value.scale + delta)),
    };
  };
</script>

<template>
  <div class="avatar-transformer">
    <div ref="imageWrapperElement" class="image-wrapper">
      <img ref="imageElement" :src="src" :style="imageStyle" @wheel.prevent="zoom" @dragstart.prevent />
    </div>
    <div class="crop-overlay"></div>
  </div>
</template>

<style lang="scss" scoped>
  .avatar-transformer {
    display: grid;
    grid-template-areas: 'content';
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }

  .image-wrapper {
    height: 100%;
    overflow: hidden;

    display: flex;
    grid-area: content;
    place-content: center;

    border-radius: 1rem;

    img {
      max-width: none;
      object-fit: cover;
      object-position: center;
    }
  }

  .crop-overlay {
    height: 100%;
    z-index: 1;

    grid-area: content;

    background: radial-gradient(circle at center, transparent 70.5%, var(--color-background-00) calc(70.5% + 1px));

    pointer-events: none;
  }
</style>
