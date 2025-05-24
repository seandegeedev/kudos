<script lang="ts" setup>
  import useMessageQueueStore from '@/stores/messageQueue';
  import type { APIResponseInvite } from '@kudos/types-api';

  const kudosAPI = useKudosAPI();
  const messageQueueStore = useMessageQueueStore();

  const props = defineProps({
    invitationID: {
      type: String,
      required: true,
    },
  });

  const getInvitationDetails = async () => {
    try {
      const response = await kudosAPI.get<APIResponseInvite>(`/manage/users/invite?inviteID=${props.invitationID}`);

      if (response.status !== 200) {
        messageQueueStore.addMessage({
          type: 'error',
          message: 'Failed to fetch invitation details 💀',
        });
        return;
      }

      const innerResponse = response.data;

      // If update is not successful, set the error message and return
      if (innerResponse.status !== 200 || !innerResponse.data) {
        messageQueueStore.addMessage({
          type: 'error',
          message: 'Failed to fetch invitation details 💀',
        });

        return;
      }
    } catch (error) {
      messageQueueStore.addMessage({
        type: 'error',
        message: 'Failed to fetch invitation details 💀',
      });
    }
  };

  onBeforeMount(async () => {
    await getInvitationDetails();
  });
</script>

<template>
  <div class="invitation-view">
    <span>Invitation View</span>
  </div>
</template>
