<script lang="ts" setup>
  import useAccountStore from '@/stores/account';

  const router = useRouter();

  const logout = async () => {
    const accountStore = useAccountStore();

    await accountStore.logout();
    await router.push('/login');
  };

  logout();
</script>

<template></template>
