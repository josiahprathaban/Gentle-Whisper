// Plugins
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import Fonts from "unplugin-fonts/vite";
import Layouts from "vite-plugin-vue-layouts";
import Vue from "@vitejs/plugin-vue";
import VueRouter from "unplugin-vue-router/vite";
import Vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import { VitePWA } from "vite-plugin-pwa";

// Utilities
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter(),
    Layouts(),
    Vue({
      template: { transformAssetUrls },
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    Vuetify({
      autoImport: true,
      styles: {
        configFile: "src/styles/settings.scss",
      },
    }),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Gentle Whisperx",
        short_name: "Gentle Whisperx",
        theme_color: "#000000",
        background_color: "#000000",
        icons: [
          {
            src: "./img/icons/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "./img/icons/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "./img/icons/android-chrome-maskable-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "./img/icons/android-chrome-maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "./img/icons/apple-touch-icon-60x60.png",
            sizes: "60x60",
            type: "image/png",
          },
          {
            src: "./img/icons/apple-touch-icon-76x76.png",
            sizes: "76x76",
            type: "image/png",
          },
          {
            src: "./img/icons/apple-touch-icon-120x120.png",
            sizes: "120x120",
            type: "image/png",
          },
          {
            src: "./img/icons/apple-touch-icon-152x152.png",
            sizes: "152x152",
            type: "image/png",
          },
          {
            src: "./img/icons/apple-touch-icon-180x180.png",
            sizes: "180x180",
            type: "image/png",
          },
          {
            src: "./img/icons/apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png",
          },
          {
            src: "./img/icons/favicon-16x16.png",
            sizes: "16x16",
            type: "image/png",
          },
          {
            src: "./img/icons/favicon-32x32.png",
            sizes: "32x32",
            type: "image/png",
          },
          {
            src: "./img/icons/msapplication-icon-144x144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "./img/icons/mstile-150x150.png",
            sizes: "150x150",
            type: "image/png",
          },
        ],
      },
    }),
    Components(),
    Fonts({
      google: {
        families: [
          {
            name: "Roboto",
            styles: "wght@100;300;400;500;700;900",
          },
        ],
      },
    }),
    AutoImport({
      imports: ["vue", "vue-router"],
      eslintrc: {
        enabled: true,
      },
      vueTemplate: true,
    }),
  ],
  define: { "process.env": {} },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
  },
  server: {
    port: 3000,
  },
  css: {
    preprocessorOptions: {
      sass: {
        api: "modern-compiler",
      },
    },
  },
});
