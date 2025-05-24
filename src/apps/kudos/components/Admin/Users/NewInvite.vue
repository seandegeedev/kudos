<script lang="ts" setup>
  import z from 'zod';
  import useMessageQueueStore from '@/stores/messageQueue';
  import AppPopup from '@/components/App/Popup.vue';
  import type { APIResponseInvite } from '@kudos/types-api';

  const kudosAPI = useKudosAPI();
  const messageQueueStore = useMessageQueueStore();

  const validationSchema = z.object({
    email: z
      .string()
      .nonempty({ message: 'The email field is required 🙄' })
      .email({ message: 'Invalid email address 💀' }),
  });

  const popup = ref<InstanceType<typeof AppPopup> | null>(null);

  const invitationID = ref<string>('');

  const liveValidate = ref(false);

  const formData = ref({
    email: '',
  });

  const formErrors = ref({
    email: '',
  });

  const saveError = ref('');

  const displayError = computed(() => {
    return Object.values(formErrors.value).find(error => error !== '') || saveError.value;
  });

  const invitationCreated = computed(() => {
    return invitationID.value !== '';
  });

  const validateForm = () => {
    liveValidate.value = true;

    const result = validationSchema.safeParse(formData.value);

    if (result.success) {
      formErrors.value = {
        email: '',
      };
      return true;
    } else {
      formErrors.value = {
        email: result.error.formErrors.fieldErrors.email?.[0] || '',
      };
      return false;
    }
  };

  const getInviteCode = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const response = await kudosAPI.post<APIResponseInvite>('/manage/users/create-invite', formData.value);

      if (response.status !== 200) {
        saveError.value = 'A server error occurred while trying to update account details 💀';
        return;
      }

      const innerResponse = response.data;

      // If update is not successful, set the error message and return
      if (innerResponse.status !== 200 || !innerResponse.data) {
        saveError.value = 'An unknown error occurred while trying to create an invite code 💀';
        return;
      }

      invitationID.value = innerResponse.data.id;

      messageQueueStore.addMessage({
        type: 'success',
        message: 'Invite code created successfully! 💪',
      });
    } catch (error) {
      saveError.value = 'An unknown error occurred while trying to create an invite code 💀';
    }
  };

  const open = () => {
    popup.value?.open();
  };

  const close = () => {
    invitationID.value = '';
    formData.value.email = '';

    popup.value?.close();
  };

  defineExpose({
    open,
  });
</script>

<template>
  <AppPopup ref="popup" @click-outside="close">
    <div class="new-invite">
      <header class="header">
        <h2 class="header-title">Invite to Kudos</h2>
        <FormButton class="header-close" type="outline" size="small" @click="close">
          <span>{{ invitationCreated ? 'Close' : 'Cancel' }}</span>
        </FormButton>
      </header>
      <template v-if="invitationCreated">
        <AdminUsersInvitationView :invitationID="invitationID" />
      </template>
      <template v-else>
        <form @submit.prevent class="new-form">
          <FormFieldText label="Email" name="email" placeholder="Enter email" v-model:value="formData.email" />
          <div class="actions">
            <FormButton @click="getInviteCode">
              <span>Get Invite Code</span>
            </FormButton>
          </div>
        </form>
      </template>
    </div>
  </AppPopup>
</template>

<style lang="scss" scoped>
  .new-invite {
    min-width: 25rem;
    padding: 1rem;

    display: grid;
    gap: 1rem;

    grid-template-rows: auto 1fr;

    background-color: var(--color-background-00);
    border-radius: 0.5rem;
  }

  .header {
    padding-bottom: 0.5rem;

    align-items: flex-end;
    display: flex;
    justify-content: space-between;

    border-bottom: 1px solid var(--color-border-00);
  }

  .header-title {
    font-size: 1.2rem;
  }

  .new-form {
    display: grid;
    gap: 1rem;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
  }
</style>
