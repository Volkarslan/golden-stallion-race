<script>
import { mapState } from 'vuex'
import locale from '@/locales/en.json'

export default {
  name: 'RaceResult',

  data() {
    return {
      /**
       * Currently expanded round number.
       * When null, all cards are collapsed.
       * @type {number | null}
       */
      expandedRound: null,
      /**
       * Localized text block for results UI.
       */
      text: locale.results
    }
  },

  computed: {
    ...mapState('race', ['results']),

    /**
     * Indicates whether there are any race results.
     * @returns {boolean}
     */
    hasResults() {
      return Array.isArray(this.results) && this.results.length > 0
    }
  },

  watch: {
    /**
     * Automatically expands the latest round card
     * whenever the results array changes.
     *
     * @param {Array} newVal
     */
    results: {
      handler(newVal) {
        if (Array.isArray(newVal) && newVal.length > 0) {
          const last = newVal[newVal.length - 1]
          this.expandedRound = last.round
        }
      },
      deep: true
    }
  },

  methods: {
    /**
     * Returns an emoji medal for podium positions.
     *
     * @param {number} index - Zero-based placement index.
     * @returns {string}
     */
    medal(index) {
      if (index === 0) return '🥇'
      if (index === 1) return '🥈'
      if (index === 2) return '🥉'
      return ''
    },

    /**
     * Checks if a given round is currently expanded.
     *
     * @param {{ round: number }} round
     * @returns {boolean}
     */
    isExpanded(round) {
      return this.expandedRound === round.round
    },

    /**
     * Toggles expansion for a given round number.
     * Clicking the same round collapses it.
     *
     * @param {number} roundNumber
     */
    toggleRound(roundNumber) {
      this.expandedRound =
        this.expandedRound === roundNumber ? null : roundNumber
    }
  }
}
</script>

<template>
  <div class="results-wrapper">
    <h2 class="results-title">
      {{ text.title }}
    </h2>

    <p v-if="!hasResults" class="results-empty">
      {{ text.noResults }}
    </p>

    <div v-else>
      <article
        v-for="round in results"
        :key="round.round"
        class="results-card"
        @click="toggleRound(round.round)"
      >
        <!-- Header -->
        <header class="results-card__header">
          <span class="results-card__title">
            {{ text.roundLabel }} {{ round.round }} • {{ round.distance }}m
          </span>
          <span class="results-card__chevron">
            {{ isExpanded(round) ? '▲' : '▼' }}
          </span>
        </header>

        <div class="results-card__divider"></div>

        <!-- Body -->
        <section class="results-card__body">
          <!-- Full list -->
          <ul v-if="isExpanded(round)" class="results-list">
            <li
              v-for="(p, index) in round.placements"
              :key="p.horse.id"
              class="results-list__item"
            >
              <div class="results-list__info">
                <span class="results-list__medal">
                  {{ medal(index) }}
                </span>
                <span>{{ index + 1 }}.</span>
                <span>{{ p.horse.name }}</span>
              </div>
              <span class="results-list__time">
                {{ p.time }}s
              </span>
            </li>
          </ul>

          <!-- Compact list (top 3 only) -->
          <ul v-else class="results-list">
            <li
              v-for="(p, index) in round.placements.slice(0, 3)"
              :key="p.horse.id"
              class="results-list__item"
            >
              <div class="results-list__info">
                <span class="results-list__medal">
                  {{ medal(index) }}
                </span>
                <span>{{ index + 1 }}.</span>
                <span>{{ p.horse.name }}</span>
              </div>
              <span class="results-list__time">
                {{ p.time }}s
              </span>
            </li>

            <li
              v-if="round.placements.length > 3"
              class="results-list__hint"
            >
              {{ text.expandHint }}
            </li>
          </ul>
        </section>
      </article>
    </div>
  </div>
</template>
