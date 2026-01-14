// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  css: [
    "~/assets/scss/index.scss",
    "~/assets/fonts/stylesheet.css",
    // '~/assets/scss/index.min.css',
  ],
  devtools: { enabled: false },
  experimental: {
    appManifest: false,
  },
  imports: {
    dirs: ["store"],
  },
  modules: [
    "@nuxt/eslint",
    "dayjs-nuxt",
    "@element-plus/nuxt",
    [
      "@pinia/nuxt",
      { autoImports: ["defineStore", "acceptHMRUpdate"], disableVuex: true },
    ],
    [
      "@nuxtjs/i18n",
      {
        bundle: {
          optimizeTranslationDirective: false, // Bu qatorni qo'shing
        },
        defaultLocale: "ru",
        fallbackLocale: "ru",
        langDir: "",
        lazy: true,
        legacy: false,
        locale: "ru",
        locales: [
          {
            code: "uz",
            file: "uz.json",
            name: "Uzbek",
          },
          {
            code: "ru",
            file: "ru.json",
            name: "Русский",
          },
          {
            code: "en",
            file: "en.json",
            name: "English",
          },
        ],
      },
    ],
    "@pinia-plugin-persistedstate/nuxt",
  ],
  nitro: {
    experimental: {
      websocket: true, // <<< Nitro WebSocket yoqildi
    },
    storage: {
      redis: {
        driver: "redis",
        // Redis konfiguratsiyasi (agar kerak bo'lsa)
      },
    },
  },
  runtimeConfig: {
    public: {
      apiBase: "https://edmsapi.sosgroup.uz/api/",
      apiImgUrl: "https://edmsapi.sosgroup.uz/storage/",
      baseUrl: "https://edmsapi.sosgroup.uz",
      tinymceKEY: "ptshvlsgd005gl07uua59lyyiiqia5pfqv5n0un2dbi820nj",
    },
  },
  // devServer: {
  //   host: '0.0.0.0',
  //   port: 3001s
  // },
  ssr: false,
  vite: {
    build: {
      minify: "terser",
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (id.includes("node_modules")) {
              return id.split("node_modules/")[1].split("/")[0];
            }
          },
        },
      },
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    css: {
      // preprocessorOptions: {
      //   scss: {
      //     // Removed invalid 'api' property
      //   }
      // },
      // postcss: {
      //   plugins: [
      //     require("cssnano")({
      //       preset: "default",
      //     }),
      //   ],
      // },
    },
    optimizeDeps: {
      include: ["element-plus", "maska", "vue"],
    },
    server: {
      hmr: {
        overlay: false, // Faqat kerakli xatoliklar uchun overlay o‘chirib qo‘yiladi.
      },
    },
  },
});

// apiBase: process.env.API_BASE_URL,
// apiImgUrl: process.env.API_BASE_IMAGE_URL,
// tinymceKEY: process.env.NUXT_BASE_TINYMCE_KEY,
