<script>
import { mapState, mapGetters } from 'vuex'
import locale from '@/locales/en.json'

export default {
  name: 'ControlPanel',

  data() {
    return {
      text: locale.controlPanel
    }
  },

  computed: {
    ...mapState('race', ['status']),
    ...mapGetters('race', ['currentRound', 'totalRounds']),

    /**
     * Indicates whether a race program has been generated.
     * @returns {boolean}
     */
    hasProgram() {
      return this.totalRounds > 0
    },

    /**
     * Controls visibility of "Generate Program" button.
     * - Shown when there is no program yet
     * - Or when the race has fully finished
     * @returns {boolean}
     */
    showGenerate() {
      return !this.hasProgram || this.status === 'finished'
    },

    /**
     * Controls visibility of "Start Round" button.
     * - Shown if a program exists
     * - And the race is not finished yet
     * @returns {boolean}
     */
    showStart() {
      return this.hasProgram && this.status !== 'finished'
    },

    /**
     * Determines whether "Start Round" button can be clicked.
     * - Visible
     * - Not already running
     * - Has an active current round
     * @returns {boolean}
     */
    canStart() {
      return this.showStart && this.status !== 'running' && !!this.currentRound
    }
  },

  methods: {
    /**
     * Triggers generation of a new race program.
     */
    generate() {
      this.$store.dispatch('race/generateProgram')
    },

    /**
     * Starts the current round if allowed.
     */
    start() {
      if (!this.canStart) return
      this.$store.dispatch('race/startCurrentRound')
    }
  }
}
</script>

<template>
  <div class="control-panel">
    <button
      v-if="showGenerate"
      type="button"
      class="btn-primary btn-primary--reset"
      @click="generate"
    >
      {{ text.buttons.generate }}
    </button>

    <button
      v-if="showStart"
      type="button"
      class="btn-primary btn-primary--start"
      :disabled="!canStart"
      @click="start"
    >
      {{ text.buttons.start }}
    </button>
  </div>
</template>
