// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  runtimeConfig: {
    pgHost: "",
    pgPort: "",
    pgUser: "",
    pgPassword: "",
    pgDatabase: "",
  },
  modules: ["@nuxtjs/google-fonts"],
  googleFonts: {
    families: {
      "Ubuntu Mono": true,
    },
  },
})
