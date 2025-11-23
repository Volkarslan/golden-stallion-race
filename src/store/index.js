import { createStore } from "vuex";
import race from "./race";

const store = createStore({
  modules: {
    race,
  },
});

export default store;
