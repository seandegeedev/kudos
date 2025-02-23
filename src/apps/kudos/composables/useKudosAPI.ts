import axios from 'axios';

export default function useKudosAPI() {
  const runtimeConfig = useRuntimeConfig();

  const kudosAPI = axios.create({
    baseURL: runtimeConfig.public.API_SERVER_URL,
    timeout: 5000,
    withCredentials: true,
  });

  return kudosAPI;
}
