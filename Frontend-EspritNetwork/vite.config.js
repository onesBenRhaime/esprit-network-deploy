import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react()],
	build: {
		rollupOptions: {
			external: [
				"vendor/aos/aos.js",
				"vendor/bootstrap/js/bootstrap.bundle.min.js",
				"vendor/glightbox/js/glightbox.min.js",
				"vendor/isotope-layout/isotope.pkgd.min.js",
				"vendor/swiper/swiper-bundle.min.js",
				"vendor/waypoints/noframework.waypoints.js",
				"vendor/php-email-form/validate.js",
				"js/main.js",
				"https://kit.fontawesome.com/867167fad8.js",
				"https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/themes/df-messenger-default.css",
			],
		},
	},
});
