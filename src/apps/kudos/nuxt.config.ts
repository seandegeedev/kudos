// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  ssr: false,
  devtools: { enabled: false },
  modules: ['@vueuse/nuxt', 'nuxt-svgo', '@pinia/nuxt', '@nuxt/image'],
  runtimeConfig: {
    public: {
      API_SERVER_URL: process.env.API_SERVER_URL,
      API_SERVER_MEDIA_URL: process.env.API_SERVER_MEDIA_URL,
    },
  },
  app: {
    head: {
      viewport: 'width=device-width, initial-scale=1',
      charset: 'utf-8',
      title: 'Kudos',
      meta: [{ name: 'description', content: 'Sintrex Kudos' }],
      link: [{ rel: 'icon', href: '/favicon.svg' }],
      htmlAttrs: {
        lang: 'en',
      },
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
        },
      },
    },
  },
  svgo: {
    componentPrefix: 'icon',
    autoImportPath: './assets/icons/',
  },
});
