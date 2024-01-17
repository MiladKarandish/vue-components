// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: false },
  css: ["~/assets/main.css", "~/assets/dana.css", "~/assets/custom.css"],
  modules: ["@pinia/nuxt", "@nuxtjs/eslint-module", "@nuxtjs/tailwindcss"],
  plugins: [
    "~/plugins/globals.ts",
    "~/plugins/directives.ts",
    {
      src: "~/plugins/lottie.client.ts",
      mode: "client",
    },
  ],
  app: {
    head: {
      title: "رقم",
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0",
        },
      ],
    },
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ["dotlottie-player"].includes(tag),
    },
  },
  components: [
    { path: "~/components/common", pathPrefix: false },
    "~/components",
  ],
});
