import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import "./styles/index.css"; // Tailwind buradan geliyor

const app = createApp(App);
app.use(store);
app.mount("#app");
