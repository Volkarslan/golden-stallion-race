// src/core/race.js
import { generateHorses, generateRounds, calculateResults } from '@/core/raceEngine';

/**
 * @typedef {Object} Horse
 * @property {number} id
 * @property {string} name
 * @property {number} condition
 * @property {string} color
 */

/**
 * @typedef {Object} Round
 * @property {number} round
 * @property {number} distance
 * @property {number[]} horses - IDs of horses participating in this round
 */

/**
 * @typedef {Object} Placement
 * @property {Horse} horse
 * @property {number} time
 */

/**
 * @typedef {Object} AnimationPayload
 * @property {number} round
 * @property {number} distance
 * @property {Placement[]} placements
 */

/**
 * @typedef {Object} RaceState
 * @property {Horse[]} horses - All generated horses (20 total)
 * @property {Horse[]} activeHorses - Horses competing in the current round (10)
 * @property {Round[]} rounds - Generated race program (6 rounds)
 * @property {number} currentRoundIndex - Index of the active round
 * @property {Array<AnimationPayload>} results - Completed round results
 * @property {'idle'|'running'|'finished'} status - Current race status
 * @property {number|null} seed - Seed used for deterministic randomness
 * @property {AnimationPayload|null} currentAnimation - Currently running round animation
 */

/**
 * Vuex state factory for race module
 * @returns {RaceState}
 */
const state = () => ({
  horses: [],
  activeHorses: [],
  rounds: [],
  currentRoundIndex: 0,
  results: [],
  status: 'idle',
  seed: null,
  currentAnimation: null
});

/**
 * Vuex mutations for race state
 */
const mutations = {
  /**
   * Resets the entire race state and initializes a new seed.
   * @param {RaceState} state
   */
  RESET_STATE(state) {
    state.horses = [];
    state.activeHorses = [];
    state.rounds = [];
    state.currentRoundIndex = 0;
    state.results = [];
    state.status = 'idle';
    state.currentAnimation = null;
    state.seed = Date.now();
  },

  /**
   * Sets initial race data.
   * @param {RaceState} state
   * @param {{horses: Horse[], activeHorses: Horse[], rounds: Round[]}} payload
   */
  SET_DATA(state, payload) {
    state.horses = payload.horses;
    state.activeHorses = payload.activeHorses;
    state.rounds = payload.rounds;
  },

  /**
   * Updates race status.
   * @param {RaceState} state
   * @param {'idle'|'running'|'finished'} status
   */
  SET_STATUS(state, status) {
    state.status = status;
  },

  /**
   * Sets the current round animation data.
   * @param {RaceState} state
   * @param {AnimationPayload|null} payload
   */
  SET_CURRENT_ANIMATION(state, payload) {
    state.currentAnimation = payload;
  },

  /**
   * Adds current round result to race history.
   * @param {RaceState} state
   * @param {AnimationPayload} result
   */
  ADD_RESULT(state, result) {
    state.results.push(result);
  },

  /**
   * Moves to the next round.
   * @param {RaceState} state
   */
  NEXT_ROUND(state) {
    state.currentRoundIndex += 1;
  },

  /**
   * Updates the active horses for the current round.
   * @param {RaceState} state
   * @param {Horse[]} horses
   */
  SET_ACTIVE_HORSES(state, horses) {
    state.activeHorses = horses;
  }
};

/**
 * Vuex actions for race logic flow
 */
const actions = {
  /**
   * Generates a new race program with fresh seed, horses and rounds.
   * @param {import('vuex').ActionContext<RaceState, any>} context
   */
  generateProgram({ commit, state }) {
    commit('RESET_STATE');

    const horses = generateHorses(state.seed);
    const rounds = generateRounds(horses, state.seed);

    const firstRound = rounds[0] || null;
    let active = [];

    if (firstRound) {
      const ids = new Set(firstRound.horses);
      active = horses.filter((h) => ids.has(h.id));
    }

    commit('SET_DATA', {
      horses,
      activeHorses: active,
      rounds
    });
  },

  /**
   * Starts the currently active round and calculates animation data.
   * @param {import('vuex').ActionContext<RaceState, any>} context
   */
  startCurrentRound({ state, commit }) {
    if (state.status === 'running') return;

    const round = state.rounds[state.currentRoundIndex];
    if (!round) return;

    const distance = round.distance;

    const ids = new Set(round.horses);
    const roundHorses = state.horses.filter((h) => ids.has(h.id));

    const placements = calculateResults(roundHorses, distance, state.seed);

    commit('SET_CURRENT_ANIMATION', {
      round: state.currentRoundIndex + 1,
      distance,
      placements
    });

    commit('SET_STATUS', 'running');
  },

  /**
   * Finalizes the current round and prepares next round if available.
   * @param {import('vuex').ActionContext<RaceState, any>} context
   */
  finishCurrentRound({ state, commit }) {
    if (!state.currentAnimation) return;

    commit('ADD_RESULT', state.currentAnimation);
    commit('SET_CURRENT_ANIMATION', null);

    const isLastRound = state.currentRoundIndex + 1 >= state.rounds.length;

    if (!isLastRound) {
      commit('NEXT_ROUND');

      const nextRound = state.rounds[state.currentRoundIndex];
      if (nextRound) {
        const ids = new Set(nextRound.horses);
        const nextActive = state.horses.filter((h) => ids.has(h.id));
        commit('SET_ACTIVE_HORSES', nextActive);
      }

      commit('SET_STATUS', 'idle');
    } else {
      commit('SET_STATUS', 'finished');
    }
  }
};

/**
 * Vuex getters for derived race data
 */
const getters = {
  /**
   * Returns the current round object.
   * @param {RaceState} state
   * @returns {Round|null}
   */
  currentRound(state) {
    return state.rounds[state.currentRoundIndex] || null;
  },

  /**
   * Returns total number of rounds.
   * @param {RaceState} state
   * @returns {number}
   */
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
