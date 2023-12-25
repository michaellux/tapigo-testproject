export default defineNuxtConfig({
  css: ['~/assets/main.css'],

  modules: [
    // pinia plugin
    '@pinia/nuxt',
    'nuxt-primevue'
  ],
  primevue: {
      /* Options */
  },

  imports: {
    dirs: ['./stores'],
  },

  pinia: {
    autoImports: ['defineStore', 'acceptHMRUpdate'],
  },
})
