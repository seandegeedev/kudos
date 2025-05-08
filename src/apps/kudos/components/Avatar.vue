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

  const alt = computed(() => {
    if (!props.userID) {
      return accountStore.displayName;
    }
    return '';
  });
</script>

<template>
  <div class="avatar">
    <img v-if="source" :src="source" :alt="alt" class="avatar-image" />
  </div>
</template>

<style lang="scss" scoped>
  .avatar {
    width: 8rem;

    align-items: center;
    display: flex;
    justify-content: center;

    .avatar-image {
      height: auto;
      width: 100%;

      object-fit: cover;
      object-position: center;

      border-radius: 50%;
    }
  }
</style>
