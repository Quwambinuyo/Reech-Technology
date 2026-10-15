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

export default defineConfig({
	plugins: [react(), tailwindcss()],
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