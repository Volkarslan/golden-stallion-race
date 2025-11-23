<script>
import { mapState } from 'vuex';
import locale from '@/locales/en.json';

export default {
  name: 'HorseList',
  data() {
    return {
      text: locale.horseList
    };
  },
  computed: {
    ...mapState('race', ['horses', 'activeHorses']),

    /**
     * Indicates whether a race program exists.
     * @returns {boolean}
     */
    hasProgram() {
      return Array.isArray(this.horses) && this.horses.length > 0;
    },

    /**
     * Horses participating in the current round.
     * @returns {Array<Object>}
     */
    racing() {
      const ids = new Set(this.activeHorses.map((h) => h.id));
      return this.horses.filter((h) => ids.has(h.id));
    },

    /**
     * Horses not participating in the current round.
     * @returns {Array<Object>}
     */
    resting() {
      const ids = new Set(this.activeHorses.map((h) => h.id));
      return this.horses.filter((h) => !ids.has(h.id));
    }
  }
};
</script>

<template>
  <div class="horse-list-wrapper">
    <h2 class="horse-list-title">{{ text.title }}</h2>

    <!-- No program -->
    <p v-if="!hasProgram" class="horse-list-empty">
      {{ text.noProgram }}
    </p>

    <!-- Program exists -->
    <div v-else>
      <!-- Racing -->
      <div class="horse-list-section">
        <h3 class="horse-list-subtitle">{{ text.racingTitle }}</h3>

        <div class="horse-list-box horse-list-box--active">
          <p v-if="!racing.length" class="horse-list-muted">
            {{ text.noRacing }}
          </p>

          <div
            v-for="horse in racing"
            :key="horse.id"
            class="horse-list-item"
          >
            <div class="horse-list-info">
              <span
                class="horse-dot"
                :style="{ backgroundColor: horse.color }"
              ></span>
              <span>{{ horse.name }}</span>
            </div>
            <span class="horse-cond">
              {{ text.condition }}: {{ horse.condition }}
            </span>
          </div>
        </div>
      </div>

      <!-- Resting -->
      <div class="horse-list-section">
        <h3 class="horse-list-subtitle">{{ text.restingTitle }}</h3>

        <div class="horse-list-box horse-list-box--resting">
          <p v-if="!resting.length" class="horse-list-muted">
            {{ text.allRacing }}
          </p>

          <div
            v-for="horse in resting"
            :key="horse.id"
            class="horse-list-item horse-list-item--resting"
          >
            <div class="horse-list-info">
              <span
                class="horse-dot horse-dot--muted"
                :style="{ backgroundColor: horse.color }"
              ></span>
              <span>{{ horse.name }}</span>
            </div>
            <span class="horse-cond">
              {{ text.condition }}: {{ horse.condition }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
