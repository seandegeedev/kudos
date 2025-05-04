export const useKudosMedia = () => {
  const runtimeConfig = useRuntimeConfig();

  const avatarsPath = `${runtimeConfig.public.API_SERVER_MEDIA_URL}/avatars/`;

  const getAvatarURL = (filename: string) => {
    return `${avatarsPath}${filename}`;
  };

  return {
    getAvatarURL,
  };
};

export default useKudosMedia;
