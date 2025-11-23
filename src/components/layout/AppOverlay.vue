<script>
import { mapState } from 'vuex'
import locale from '@/locales/en.json'

export default {
  name: 'AppOverlay',

  data() {
    return {
      /**
       * Local UI visibility for the overlay.
       * Even if the race status is "finished",
       * the user may temporarily close this.
       * @type {boolean}
       */
      isOpen: false,
      /**
       * Localized text block for overlay content.
       */
      text: locale.raceTrack.overlay
    }
  },

  computed: {
    ...mapState('race', ['status'])
  },

  watch: {
    /**
     * Opens the overlay whenever global race status
     * becomes "finished". Closes it in all other cases.
     *
     * @param {string} newStatus
     */
    status(newStatus) {
      if (newStatus === 'finished') {
        this.isOpen = true
      } else {
        this.isOpen = false
      }
    }
  },

  methods: {
    /**
     * Closes the overlay without modifying race status.
     */
    closeOverlay() {
      this.isOpen = false
    },

    /**
     * Starts a brand-new race program and closes the overlay.
     */
    startNewRace() {
      this.isOpen = false
      this.$store.dispatch('race/generateProgram')
    }
  }
}
</script>

<template>
  <div
    v-if="isOpen"
    class="app__overlay"
  >
    <div class="app__overlay-card">
      <div class="app__overlay-icon">
        🏆
      </div>

      <h3 class="app__overlay-title">
        {{ text.title }}
      </h3>

      <p class="app__overlay-text">
        {{ text.description }}
      </p>

      <div class="app__overlay-actions">
        <button
          type="button"
          class="btn-primary btn-primary--reset"
          @click="closeOverlay"
        >
          {{ text.close }}
        </button>

        <button
          type="button"
          class="btn-primary btn-primary--start"
          @click="startNewRace"
        >
          {{ text.newRace }}
        </button>
      </div>
    </div>
  </div>
</template>
