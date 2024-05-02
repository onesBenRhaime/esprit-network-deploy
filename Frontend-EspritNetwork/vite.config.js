import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react()],
	build: {
		rollupOptions: {
			external: [
				"assets/vendor/aos/aos.js",
				"assets/vendor/bootstrap/js/bootstrap.bundle.min.js",
				"assets/vendor/glightbox/js/glightbox.min.js",
				"assets/vendor/isotope-layout/isotope.pkgd.min.js",
				"assets/vendor/swiper/swiper-bundle.min.js",
				"assets/vendor/waypoints/noframework.waypoints.js",
				"assets/vendor/php-email-form/validate.js",
				"assets/js/main.js",
				"https://kit.fontawesome.com/867167fad8.js",
				"https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/themes/df-messenger-default.css",
			],
		},
	},
});
