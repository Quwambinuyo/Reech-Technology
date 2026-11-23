// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";

// // https://vite.dev/config/
// export default defineConfig({
// 	plugins: [react(), tailwindcss()],
// 	server: {
// 		port: 3004,
// 	},
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		VitePWA({
			registerType: "autoUpdate",
			includeAssets: ["reech.ico"],
			manifest: {
				name: "Reech",
				short_name: "Reech",
				description: "Reech",
				start_url: "/",
				scope: "/",
				display: "standalone",
				background_color: "#ffffff",
				theme_color: "#ffffff",
				icons: [
					{
						src: "pwa-192x192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "pwa-512x512.png",
						sizes: "512x512",
						type: "image/png",
					},
					{
						src: "pwa-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "any maskable",
					},
				],
			},
			workbox: {
				globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
				navigateFallback: "/index.html",
				runtimeCaching: [
					{
						urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
						handler: "StaleWhileRevalidate",
						options: { cacheName: "google-fonts-styles" },
					},
					{
						urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
						handler: "CacheFirst",
						options: {
							cacheName: "google-fonts-files",
							expiration: {
								maxEntries: 30,
								maxAgeSeconds: 60 * 60 * 24 * 365,
							},
							cacheableResponse: { statuses: [0, 200] },
						},
					},
				],
			},
		}),
	],
	server: {
		port: 3004,
		proxy: {
			"/api/v1": {
				target: "http://217.117.15.108:8090",
				changeOrigin: true,
			},
		},
	},
});