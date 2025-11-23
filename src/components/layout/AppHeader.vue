<script>
import { mapState, mapGetters } from 'vuex'
import gameLogo from '@/assets/images/game-logo-64.png'
import locale from '@/locales/en.json'

export default {
  name: 'AppHeader',

  data() {
    return {
      gameLogo,
      text: locale.header
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
     * @returns {boolean}
     */
    showGenerate() {
      return !this.hasProgram || this.status === 'finished'
    },

    /**
     * Controls visibility of "Start Round" button.
     * @returns {boolean}
     */
    showStart() {
      return this.hasProgram && this.status !== 'finished'
    },

    /**
     * Determines whether "Start Round" button can be clicked.
     * @returns {boolean}
     */
    canStart() {
      return this.showStart && this.status !== 'running' && !!this.currentRound
    },

    generateAriaLabel() {
      return this.text.buttons.generateAria
    },

    startAriaLabel() {
      return this.text.buttons.startAria
    }
  },

  methods: {
    /**
     * Triggers generation of a new race program.
     */
    onGenerate() {
      this.$store.dispatch('race/generateProgram')
    },

    /**
     * Starts the current round.
     */
    onStart() {
      if (!this.canStart) return
      this.$store.dispatch('race/startCurrentRound')
    }
  }
}
</script>

<template>
  <header class="app-header">
    <!-- Left: Logo + Title -->
    <div class="app-header__brand">
      <img
        :src="gameLogo"
        alt="Golden Stallion logo"
        class="app-header__logo"
      />

      <div class="flex flex-col">
        <span class="app-header__title">
          {{ text.title }}
        </span>
        <span class="app-header__subtitle">
          {{ text.subtitle }}
        </span>
      </div>
    </div>

    <!-- Desktop Buttons -->
    <div class="app-header__actions-desktop">
      <button
        v-if="showGenerate"
        type="button"
        class="btn-primary btn-primary--reset"
        @click="onGenerate"
      >
        {{ text.buttons.generate }}
      </button>

      <button
        v-if="showStart"
        type="button"
        class="btn-primary btn-primary--start"
        :disabled="!canStart"
        @click="onStart"
      >
        {{ text.buttons.start }}
      </button>
    </div>

    <!-- Mobile Icon Buttons -->
    <div class="app-header__actions-mobile">
      <button
        v-if="showGenerate"
        type="button"
        class="btn-icon btn-icon--reset"
        :aria-label="generateAriaLabel"
        @click="onGenerate"
      >
        📋
      </button>

      <button
        v-if="showStart"
        type="button"
        class="btn-icon btn-icon--start"
        :aria-label="startAriaLabel"
        :disabled="!canStart"
        @click="onStart"
      >
        🏁
      </button>
    </div>
  </header>
</template>
