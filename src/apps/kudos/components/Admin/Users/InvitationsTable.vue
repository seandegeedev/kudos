<script setup lang="ts">
  const searchTerm = ref<string>('');

  const data = ref([
    {
      created: '2023-10-01',
      email: 'tes@email.com',
      status: 'Pending',
      id: 'id-1234',
    },
    {
      created: '2023-10-01',
      email: 'tes@email.com',
      status: 'Pending',
      id: 'id-1234',
    },
    {
      created: '2023-10-01',
      email: 'tes@email.com',
      status: 'Pending',
      id: 'id-1234',
    },
    {
      created: '2023-10-01',
      email: 'tes@email.com',
      status: 'Pending',
      id: 'id-1234',
    },
    {
      created: '2023-10-01',
      email: 'tes@email.com',
      status: 'Pending',
      id: 'id-1234',
    },
  ]);

  const columns = ref([
    { key: 'created', label: 'Created' },
    { key: 'email', label: 'Email' },
    { key: 'status', label: 'Status' },
  ]);

  const columnKeys = computed(() => {
    type DataColumns = keyof (typeof data.value)[0];

    return columns.value.map(column => column.key) as DataColumns[];
  });

  const revokeInvitation = async (id: string) => {
    // Logic to delete the invitation by id
    console.log(`Deleting invitation with id: ${id}`);
  };

  const resendInvitation = async (id: string) => {
    // Logic to resend the invitation by id
    console.log(`Resending invitation with id: ${id}`);
  };
</script>

<template>
  <div class="invitations-table">
    <form submit.prevent class="table-actions">
      <FormFieldSearch class="search-field" placeholder="Search Invites" v-model:value="searchTerm" />
    </form>
    <div class="table">
      <header class="row header-row">
        <div v-for="column in columns" :key="column.key" class="cell header-cell">
          <span>{{ column.label }}</span>
        </div>
        <div class="cell header-cell"></div>
      </header>
      <div v-for="row in data" class="row">
        <div v-for="key in columnKeys" class="cell">
          <span>{{ row[key] || '' }}</span>
        </div>
        <div class="cell actions">Actions</div>
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
    grid-template-columns: repeat(4, 1fr);
  }

  .search-field {
    max-width: 30rem;
  }

  .row {
    display: grid;
    grid-column: 1 / span 4;
    grid-template-columns: subgrid;

    border-bottom: 1px solid var(--color-border-00);
  }

  .cell {
    padding: 0.5rem 0.25rem;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
  }
</style>
