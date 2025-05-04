<script lang="ts" setup>
  const kudosAPI = useKudosAPI();
  const kudosMedia = useKudosMedia();

  const props = defineProps({
    userID: {
      type: String as PropType<string>,
      required: false,
    },
  });

  const source = ref('');
  const alt = ref('');
</script>

<template>
  <div class="avatar">
    <img v-if="source" :src="source" :alt="alt" class="avatar-image" />
  </div>
</template>
