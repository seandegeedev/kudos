import { defineStore } from 'pinia';
import type { APIResponseAuthVerify } from '@kudos/types-api';

const useAccountStore = defineStore('account', () => {
  const kudosAPI = useKudosAPI();
  const kudosMedia = useKudosMedia();

  const fetchError = ref<string | null>(null);

  const id = ref<string>('');
  const firstName = ref<string>('');
  const lastName = ref<string>('');
  const email = ref<string>('');
  const avatar = ref<string>('');
  const verified = ref<boolean>(false);
  const admin = ref<boolean>(false);
  const created = ref<Date>();

  const displayName = computed(() => {
    if (firstName.value && lastName.value) {
      return `${firstName.value} ${lastName.value}`;
    }

    if (firstName.value) {
      return firstName.value;
    }

    if (lastName.value) {
      return lastName.value;
    }

    return 'User';
  });

  const avatarURL = computed(() => {
    if (avatar.value) {
      return kudosMedia.getAvatarURL(avatar.value);
    }
    return '';
  });

  const logout = async () => {
    fetchError.value = null;

    try {
      const response = await kudosAPI.get('auth/logout');

      if (response.status !== 200) {
        fetchError.value = 'A server error occurred while trying to log out 💀';
        return;
      }

      // Clear the user data
      id.value = '';
      firstName.value = '';
      lastName.value = '';
      email.value = '';
      avatar.value = '';
      verified.value = false;
      admin.value = false;
      created.value = undefined;

      // Redirect to the login page
      navigateTo('/login');
    } catch (error) {
      fetchError.value = 'An error occurred while trying to log out: ' + error;
    }
  };

  const fetch = async () => {
    fetchError.value = null;

    try {
      const response = await kudosAPI.get<APIResponseAuthVerify>('auth/verify');

      if (response.status !== 200 || !response.data.data) {
        fetchError.value = 'A server error occurred while trying to fetch account details 💀';
        return;
      }

      const user = response.data.data.user;

      id.value = user.id;
      firstName.value = user.firstName;
      lastName.value = user.lastName;
      email.value = user.email;
      avatar.value = user.avatar;
      verified.value = user.verified;
      admin.value = user.admin;
      created.value = user.created;
    } catch (error) {
      fetchError.value = 'An error occurred while trying to fetch account details: ' + error;
    }
  };

  return {
    id,
    firstName,
    lastName,
    displayName,
    email,
    avatar,
    avatarURL,
    verified,
    admin,
    created,
    logout,
    fetch,
  };
});

export default useAccountStore;
