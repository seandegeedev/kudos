import kudosAPI from '@/src/api';

export const isGetStartedRequired = async (): Promise<boolean> => {
  const response = await kudosAPI.fetch('status');

  if (!response.ok) return false;

  const result = await response.json();

  if (result.status !== 200) return false;

  return result.data.getStartedRequired;
};
