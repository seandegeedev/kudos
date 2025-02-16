const BASE_URL = process.env.API_SERVER_URL || '';
const DEFAULT_OPTIONS: RequestInit = {};

/* Wrapper around fetch that adds the base URL and default options */
const apiFetch = async (relativePath: string | URL | Request, options?: RequestInit): Promise<Response> => {
  if (typeof relativePath === 'string' && relativePath.startsWith('/')) {
    relativePath = relativePath.slice(1);
  }

  const SANITIZED_BASE_URL = BASE_URL.endsWith('/') ? BASE_URL : BASE_URL + '/';

  const url = new URL(relativePath.toString(), SANITIZED_BASE_URL);

  return fetch(url, { ...DEFAULT_OPTIONS, ...options });
};

const kudosAPI = {
  fetch: apiFetch,
};

export default kudosAPI;
