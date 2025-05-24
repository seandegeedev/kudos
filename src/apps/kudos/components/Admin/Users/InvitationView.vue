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

  const invitationDetails = ref({
    email: '',
    code: '',
  });

  const codeCharacters = computed(() => {
    return invitationDetails.value.code.split('');
  });

  const invitationLink = computed(() => {
    return `${window.location.origin}/invite/${props.invitationID}`;
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

      invitationDetails.value.email = innerResponse.data.email;
      invitationDetails.value.code = innerResponse.data.code;
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
    <p class="email">{{ invitationDetails.email }}</p>
    <div class="code">
      <div v-for="(char, index) in codeCharacters" :key="index" class="code-character">
        <span>{{ char }}</span>
      </div>
    </div>
    <div class="actions">
      <p class="action"><icon-clone /> <span>Code</span></p>
      <p class="action"><icon-clone /> <span>Link</span></p>
    </div>
    <form class="view-form" submit.prevent>
      <FormButton>Delete</FormButton>
    </form>
  </div>
</template>

<style scoped lang="scss">
  .invitation-view {
    display: grid;
    gap: 1rem;
  }

  .email {
    text-align: center;
  }

  .code {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
  }

  .code-character {
    padding: 0.5rem 1rem;

    background-color: var(--color-background-01);
    border-radius: 0.5rem;

    font-size: 1.5rem;
  }

  .actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }

  .action {
    align-items: center;
    display: flex;
    gap: 0.5rem;

    cursor: pointer;
  }

  .view-form {
    padding-top: 0.5rem;

    display: flex;
    justify-content: flex-end;
  }
</style>
