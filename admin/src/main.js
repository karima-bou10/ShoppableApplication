import { createApp } from 'vue'
import App from './App.vue'
import HotSpots from 'vue3-hot-spot'
import 'vue3-hot-spot/dist/vue3-hot-spot.css';
import store from './store';

const app = createApp(App);

// Register HotSpots as a global component
app.component('HotSpots', HotSpots);
app.use(store);
// Mount the app
app.mount('#app');
