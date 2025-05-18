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

  const previousCursorPosition = ref({
    x: 0,
    y: 0,
  });

  const isDragging = ref(false);

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
      cursor: isDragging.value ? 'grabbing' : 'grab',
    };
  });

  const zoom = async (event: WheelEvent) => {
    if (!imageElement.value || !imageWrapperElement.value) {
      return;
    }

    const delta = event.deltaY > 0 ? -0.1 : 0.1;

    // Correct the transform values to prevent the image from being zoomed out of the wrapper
    const imageRect = imageElement.value.getBoundingClientRect();
    const wrapperRect = imageWrapperElement.value.getBoundingClientRect();

    const imageWidth = imageRect.width;
    const imageHeight = imageRect.height;
    const wrapperWidth = wrapperRect.width;
    const wrapperHeight = wrapperRect.height;

    const imageStyle = window.getComputedStyle(imageElement.value);
    const transformStyle = imageStyle.transform;

    let translateX = 0;
    let translateY = 0;

    const matrix = transformStyle
      .match(/matrix.*\((.+)\)/)?.[1]
      .split(', ')
      .map(Number);

    if (matrix) {
      translateX = matrix[4];
      translateY = matrix[5];
    }

    let newTranslateXAsPercentage = ((translateX - currentCursorPosition.value.x) / imageWidth) * 100;
    let newTranslateYAsPercentage = ((translateY - currentCursorPosition.value.y) / imageHeight) * 100;

    const maxTranslateX = Math.floor((imageWidth - wrapperWidth) / (2 * imageWidth)) * 100;
    const maxTranslateY = Math.floor((imageHeight - wrapperHeight) / (2 * imageHeight)) * 100;

    const minTranslateX = -maxTranslateX;
    const minTranslateY = -maxTranslateY;

    transform.value = {
      x: Math.max(minTranslateX, Math.min(maxTranslateX, newTranslateXAsPercentage)),
      y: Math.max(minTranslateY, Math.min(maxTranslateY, newTranslateYAsPercentage)),
      scale: Math.max(1, Math.min(5, transform.value.scale + delta)),
    };
  };

  const beginDrag = (event: MouseEvent) => {
    if (!imageElement.value || !imageWrapperElement.value) {
      return;
    }

    isDragging.value = true;
    // Set the cursor to grabbing
    document.body.style.cursor = 'grabbing';

    currentCursorPosition.value = {
      x: event.clientX,
      y: event.clientY,
    };

    document.onmousemove = drag;
    document.onmouseup = endDrag;
  };

  const drag = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();

    if (!imageElement.value || !imageWrapperElement.value) {
      return;
    }

    // Get image dimensions
    const imageRect = imageElement.value.getBoundingClientRect();

    const imageWidth = imageRect.width;
    const imageHeight = imageRect.height;

    // Get wrapper dimensions
    const wrapperRect = imageWrapperElement.value.getBoundingClientRect();

    const wrapperWidth = wrapperRect.width;
    const wrapperHeight = wrapperRect.height;

    previousCursorPosition.value = {
      x: currentCursorPosition.value.x - event.clientX,
      y: currentCursorPosition.value.y - event.clientY,
    };

    currentCursorPosition.value = {
      x: event.clientX,
      y: event.clientY,
    };

    // Get the transform values of the image
    const imageStyle = window.getComputedStyle(imageElement.value);
    const transformStyle = imageStyle.transform;

    let translateX = 0;
    let translateY = 0;

    const matrix = transformStyle
      .match(/matrix.*\((.+)\)/)?.[1]
      .split(', ')
      .map(Number);

    if (matrix) {
      translateX = matrix[4];
      translateY = matrix[5];
    }

    let newTranslateXAsPercentage = ((translateX - previousCursorPosition.value.x) / imageWidth) * 100;
    let newTranslateYAsPercentage = ((translateY - previousCursorPosition.value.y) / imageHeight) * 100;

    const maxTranslateX = ((imageWidth - wrapperWidth) / (2 * imageWidth)) * 100;
    const maxTranslateY = ((imageHeight - wrapperHeight) / (2 * imageHeight)) * 100;

    const minTranslateX = -maxTranslateX;
    const minTranslateY = -maxTranslateY;

    transform.value = {
      ...transform.value,
      x: Math.max(minTranslateX, Math.min(maxTranslateX, newTranslateXAsPercentage)),
      y: Math.max(minTranslateY, Math.min(maxTranslateY, newTranslateYAsPercentage)),
    };
  };

  const endDrag = (event: MouseEvent) => {
    isDragging.value = false;

    document.body.style.cursor = 'auto';

    document.onmousemove = null;
    document.onmouseup = null;
  };
</script>

<template>
  <div class="avatar-transformer">
    <div ref="imageWrapperElement" class="image-wrapper">
      <img ref="imageElement" :src="src" :style="imageStyle" @wheel.prevent="zoom" @mousedown.prevent="beginDrag" />
    </div>
    <div class="crop-overlay"></div>
  </div>
</template>

<style lang="scss" scoped>
  .avatar-transformer {
    aspect-ratio: 1 / 1;

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
