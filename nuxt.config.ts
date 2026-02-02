// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  css: [
    "~/assets/scss/index.scss",
    "~/assets/fonts/stylesheet.css",
    // '~/assets/scss/index.min.css',
  ],
  // devServer: {
  //   host: "0.0.0.0",
  //   port: 3001,
  // },
  devtools: { enabled: true },
  experimental: {
    appManifest: false,
  },
  imports: {
    dirs: ["store", "types/**"],
  },
  modules: [
    "@nuxt/eslint",
    "dayjs-nuxt",
    [
      "@element-plus/nuxt",
      {
        /** Element Plus auto-import sozlamalari */
        importStyle: "scss",
        injectionID: { current: 0, prefix: 1024 },
      },
    ],
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
    [
      "@vite-pwa/nuxt",
      {
        devOptions: {
          enabled: true, // Dev rejimida ham PWA ishlashini yoqish (test qilish uchun)
          navigateFallbackAllowlist: [/^\/$/], // Fallback sahifasi uchun ruxsatlar
          suppressWarnings: true, // Ogohlantirishlarni yashirish
          type: "module",
        },
        manifest: {
          background_color: "#ffffff", // Ilova ochilishidagi fon rangi (splash screen)
          description: "International Affairs application", // Ilova haqida qisqacha ma'lumot
          display: "standalone", // Ilova brauzer panellarisiz, alohida dastur kabi ochiladi
          icons: [
            {
              sizes: "192x192",
              src: "/pwa-192x192.png", // 192x192 o'lchamdagi belgi (mobil qurilmalar uchun)
              type: "image/png",
            },
            {
              sizes: "512x512",
              src: "/pwa-512x512.png", // 512x512 o'lchamdagi belgi (splash screen va kattaroq ekranlar uchun)
              type: "image/png",
            },
            {
              purpose: "any", // Mana shu qatorni qo'shing
              sizes: "192x192",
              src: "/pwa-192x192.png",
              type: "image/png",
            },
          ],
          name: "International Affairs", // Ilovaning to'liq nomi (o'rnatilganda ko'rinadi)
          orientation: "portrait", // Ilova faqat vertikal rejimda ishlaydi (ixtiyoriy)
          scope: "/", // PWA ishlash doirasi (butun sayt uchun)
          short_name: "Int. Affairs", // Ilovaning qisqa nomi (ekranda joy kam bo'lganda ko'rinadi)
          start_url: "/", // Ilova ishga tushganda ochiladigan sahifa
          theme_color: "#ffffff", // Ilova mavzusi rangi (status bar va boshqalar uchun)
        },
        registerType: "autoUpdate", // Servis worker yangilanishi avtomatik amalga oshadi (foydalanuvchi tasdiqlashini kutmaydi)
        workbox: {
          globPatterns: ["**/*.{js,css,html,png,svg,ico}"], // Keshlash uchun fayl turlari (oflayn ishlash uchun)
        },
      },
    ],
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
  // https://iab.unknown-gruop.uz/
  runtimeConfig: {
    public: {
      apiBase: "https://iab.unknown-gruop.uz/api/",
      apiImgUrl: "https://iab.unknown-gruop.uz/storage/",
      baseUrl: "https://iab.unknown-gruop.uz/",
      tinymceKEY: "ptshvlsgd005gl07uua59lyyiiqia5pfqv5n0un2dbi820nj",
    },
  },
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

// apiImgUrl: process.env.API_BASE_IMAGE_URL,
// tinymceKEY: process.env.NUXT_BASE_TINYMCE_KEY,
