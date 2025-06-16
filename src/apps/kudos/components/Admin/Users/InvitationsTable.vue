<script setup lang="ts">
  import { DateTime } from 'luxon';
  import useMessageQueueStore from '@/stores/messageQueue';
  import type { APIResponseInvites } from '@kudos/types-api';
  import { createDraggable } from 'animejs';

  const kudosAPI = useKudosAPI();
  const messageQueueStore = useMessageQueueStore();

  const searchTerm = ref<string>('');
  const page = ref(1);
  const size = ref(10);
  const pages = ref(1);
  const hasNextPage = ref(false);
  const hasPreviousPage = ref(false);

  const data = ref<
    {
      id: string;
      created: string;
      archived: boolean;
      email: string;
      fromID: string;
      code: string;
      redeemed: boolean;
    }[]
  >([]);

  type DataColumns = keyof (typeof data.value)[0] | '_';

  const columns = ref<
    {
      property: DataColumns;
      key: string;
      label: string;
    }[]
  >([
    { property: 'created', key: 'created', label: 'Created' },
    { property: 'email', key: 'email', label: 'Email' },
    { property: '_', key: 'status', label: 'Status' },
  ]);

  const tableColumnStyleDefinitions = computed(() => {
    return {
      // The +1 accounts for the actions column
      gridTemplateColumns: `repeat(${columns.value.length + 1}, auto)`,
      rowGridSpan: `1 / span ${columns.value.length + 1}`,
    };
  });

  const fetchInvitations = async () => {
    try {
      const response = await kudosAPI.get<APIResponseInvites>('/manage/users/invites', {
        params: { search: searchTerm.value, page: page.value, size: size.value },
      });

      if (response.status !== 200 || !response.data) {
        messageQueueStore.addMessage({
          type: 'error',
          message: 'There was an error fetching invitations 💀',
        });
      }

      const innerResponse = response.data;

      if (innerResponse.status !== 200 || !innerResponse.data) {
        messageQueueStore.addMessage({
          type: 'error',
          message: 'There was an error fetching invitations 💀',
        });
        return;
      }

      pages.value = innerResponse.data.pages;
      hasNextPage.value = innerResponse.data.hasNextPage;
      hasPreviousPage.value = innerResponse.data.hasPreviousPage;
      size.value = innerResponse.data.size;

      data.value = innerResponse.data.data.map(invite => ({
        id: invite.id,
        created: DateTime.fromISO(invite.created).toFormat('dd MMM, yyyy HH:mm'),
        archived: invite.archived,
        email: invite.email,
        fromID: invite.fromID,
        code: invite.code,
        redeemed: invite.redeemed,
      }));
    } catch (error) {
      messageQueueStore.addMessage({
        type: 'error',
        message: 'There was an error fetching invitations 💀',
      });
    }
  };

  const revokeInvitation = async (id: string) => {
    // Logic to delete the invitation by id
    console.log(`Deleting invitation with id: ${id}`);
  };

  const resendInvitation = async (id: string) => {
    // Logic to resend the invitation by id
    console.log(`Resending invitation with id: ${id}`);
  };

  // Fetch invitations when the component is mounted or when searchTerm, page, or size changes
  onMounted(() => {
    fetchInvitations();
  });

  watch([searchTerm, page, size], () => {
    fetchInvitations();
  });
</script>

<template>
  <div class="invitations-table">
    <form submit.prevent class="table-actions">
      <FormFieldSearch class="search-field" placeholder="Search Invites" v-model:value="searchTerm" />
    </form>
    <div class="table" :style="`grid-template-columns: ${tableColumnStyleDefinitions.gridTemplateColumns}`">
      <header class="row header-row" :style="`grid-column: ${tableColumnStyleDefinitions.rowGridSpan}`">
        <div v-for="column in columns" :key="column.key" class="cell header-cell">
          <span>{{ column.label }}</span>
        </div>
        <div class="cell header-cell"></div>
      </header>
      <div v-for="row in data" class="row" :style="`grid-column: ${tableColumnStyleDefinitions.rowGridSpan}`">
        <template v-for="column in columns">
          <!-- If computed property -->
          <template v-if="column.property === '_'">
            <!-- Check for each computed property -->
            <template v-if="column.key === 'status'">
              <div class="cell--status">
                <div
                  :class="[
                    'status',
                    row.archived ? 'status--archived' : row.redeemed ? 'status--redeemed' : 'status--pending',
                  ]"
                >
                  <span>{{ row.archived ? 'Archived' : row.redeemed ? 'Redeemed' : 'Pending' }}</span>
                </div>
              </div>
            </template>
          </template>
          <!-- Else, if normal property -->
          <template v-else>
            <div class="cell">
              <span>{{ row[column.property] || '' }}</span>
            </div>
          </template>
        </template>
        <div class="cell actions">
          <span>View</span>
          <span>Delete</span>
          <span>Archive</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .invitations-table {
    display: grid;
    gap: 0.5rem;

    overflow-x: auto;
  }

  .table {
    min-width: max-content;

    display: grid;
  }

  .search-field {
    max-width: 30rem;
  }

  .row {
    display: grid;
    grid-template-columns: subgrid;

    border-bottom: 1px solid var(--color-border-00);
  }

  .cell {
    padding: 0.5rem 0.25rem;

    align-items: center;
    display: flex;
  }

  .actions {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
  }

  // -----------------------------
  .cell--status {
    padding: 0.5rem 0.25rem;
  }

  .status {
    padding: 0.25rem 0.5rem;

    display: inline-flex;

    background-color: var(--color-status-gray-background-00);
    border: 1px solid var(--color-status-gray-border-00);
    border-radius: 0.5rem;

    font-size: small;

    &--pending {
      background-color: var(--color-status-blue-background-00);
      border-color: var(--color-status-blue-border-00);

      span {
        color: var(--color-status-blue-type-00);
      }
    }
    &--redeemed {
      background-color: var(--color-status-green-background-00);
      border-color: var(--color-status-green-border-00);

      span {
        color: var(--color-status-green-type-00);
      }
    }
    &--archived {
      background-color: var(--color-status-gray-background-00);
      border-color: var(--color-status-gray-border-00);

      span {
        color: var(--color-status-gray-type-00);
      }
    }
  }
</style>
