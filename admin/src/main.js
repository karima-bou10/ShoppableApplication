import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import HotSpots from "vue3-hot-spot";
import "vue3-hot-spot/dist/vue3-hot-spot.css";
import store from "./store";
// Import the necessary Font Awesome components
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// Add the Font Awesome icons to the library
library.add(faEye, faEyeSlash);

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);

app.use(store).use(router).mount("#app");

// Register HotSpots as a global component
app.component("HotSpots", HotSpots);
