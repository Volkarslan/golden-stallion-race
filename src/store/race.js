const distances = [1200, 1400, 1600, 1800, 2000, 2200];

const state = () => ({
  horses: [],
  activeHorses: [],
  rounds: [],
  currentRoundIndex: 0,
  results: [],
  status: "idle", // idle | running | finished
  seed: null
});

const mutations = {
  RESET_STATE(state) {
    state.horses = [];
    state.activeHorses = [];
    state.rounds = [];
    state.currentRoundIndex = 0;
    state.results = [];
    state.status = "idle";
    state.seed = null;
  },
  SET_INITIAL_DATA(state, payload) {
    state.horses = payload.horses;
    state.activeHorses = payload.activeHorses;
    state.rounds = payload.rounds;
    state.seed = payload.seed;
  },
  SET_STATUS(state, status) {
    state.status = status;
  },
  ADD_RESULT(state, result) {
    state.results.push(result);
  },
  NEXT_ROUND(state) {
    state.currentRoundIndex += 1;
    if (state.currentRoundIndex >= state.rounds.length) {
      state.status = "finished";
    }
  }
};

const actions = {
  generateProgram({ commit }) {
    // Bunu bir sonraki adımda raceEngine ile dolduracağız
    commit("RESET_STATE");
  },
  startCurrentRound() {
    // raceEngine ile yarış hesaplaması burada olacak
  }
};

const getters = {
  currentRound(state) {
    return state.rounds[state.currentRoundIndex] || null;
  },
  totalRounds(state) {
    return state.rounds.length;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
