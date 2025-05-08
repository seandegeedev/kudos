<script lang="ts" setup>
  import useAccountStore from '@/stores/account';

  const accountStore = useAccountStore();

  const props = defineProps({
    userID: {
      type: String as PropType<string>,
      required: false,
    },
  });

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
</script>

<template>
  <div class="avatar">
    <img
      v-if="source"
      class="avatar-image"
      :src="source"
      :alt="alt"
      :style="{ transform: `scale(${scale}) translate(${offset.x}%, ${offset.y}%)` }"
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
      height: auto;
      width: 100%;

      object-fit: cover;
      object-position: center;
    }
  }
</style>
