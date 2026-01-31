// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "latest",
  devtools: { enabled: true },
  app: {
    head: {
      titleTemplate: "%s - Nuxt",
      title: "Boiler Dashboard",
    },
  },
  modules: ["@nuxt/image", "shadcn-nuxt"],
  css: ["~/assets/css/main.css"],
  shadcn: {
    prefix: "",
    componentDir: "@/components/ui",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
