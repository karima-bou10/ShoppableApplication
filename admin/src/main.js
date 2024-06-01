import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import HotSpots from "vue3-hot-spot";
import "vue3-hot-spot/dist/vue3-hot-spot.css";
// Import the necessary Font Awesome components
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import VueApexCharts from "vue3-apexcharts";

// Add the Font Awesome icons to the library
library.add(faEye, faEyeSlash);

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
// Use VueApexCharts as a plugin
app.component("apexchart", VueApexCharts);
app.use(router).mount("#app");

// Register HotSpots as a global component
app.component("HotSpots", HotSpots);
