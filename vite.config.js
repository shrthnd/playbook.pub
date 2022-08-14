import path from "path"; 
import { VitePWA } from 'vite-plugin-pwa'

module.exports = {
  root: path.join(__dirname, "src"),
  publicDir: path.join(__dirname, "public"),
  build: {
    emptyOutDir: true,
    outDir: path.join(__dirname, "dist"),
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'src/index.html')
      }
    }
  },
  plugins: [
    VitePWA({
      manifest: {
        name: "playbook.pub",
        short_name: "playbook.pub",
        lang: "en-US",
        // id: "http://localhost:8080/",
        start_url: "/",
        icons: [
          {
            src: "/icons/manifest-icon-192.maskable.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/icons/manifest-icon-192.maskable.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "/icons/manifest-icon-512.maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/icons/manifest-icon-512.maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          }
        ],
        theme_color: "#448aff",
        background_color: "#448aff",
        display: "standalone"
      }
    })
  ]
}