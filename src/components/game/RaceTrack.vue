<!-- src/components/game/RaceTrack.vue -->
<script>
import { mapState, mapGetters } from 'vuex'
import locale from '@/locales/en.json'

/**
 * Simple deterministic pseudo-random helper based on Math.sin.
 * Used to derive per-horse speed curves from stable seeds.
 *
 * @param {number} seed
 * @returns {number} A float between 0 and 1.
 */
function pseudoRand(seed) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

/**
 * RaceTrack component
 * - Renders race lanes and animated horses
 * - Drives the per-round animation lifecycle
 */
export default {
  name: 'RaceTrack',

  data() {
    return {
      /**
       * Animated horses on the track.
       * @type {Array<Object>}
       */
      animHorses: [],
      /**
       * Initial timestamp used by requestAnimationFrame.
       * @type {number | null}
       */
      startTime: null,
      /**
       * Active requestAnimationFrame id.
       * @type {number | null}
       */
      frameId: null,
      /**
       * Localized text for race track header & status.
       */
      text: locale.raceTrack
    }
  },

  computed: {
    ...mapState('race', ['activeHorses', 'currentAnimation', 'status']),
    ...mapGetters('race', ['currentRound', 'totalRounds']),

    /**
     * Horses to display on the track.
     * If an animation is in progress, use animHorses.
     * Otherwise, map directly from activeHorses.
     *
     * @returns {Array<Object>}
     */
    lanes() {
      if (this.animHorses.length) return this.animHorses

      return this.activeHorses.map((h) => ({
        id: h.id,
        name: h.name,
        color: h.color,
        raceProgress: 0,
        progress: 0,
        visualPercent: 0
      }))
    },

    /**
     * Id of the current leader horse based on logical progress.
     *
     * @returns {number | null}
     */
    leaderId() {
      if (!this.lanes.length) return null

      let max = -1
      let leader = null

      this.lanes.forEach((h) => {
        if (h.progress > max) {
          max = h.progress
          leader = h.id
        }
      })

      return leader
    },

    /**
     * Human-readable status line below the header.
     *
     * @returns {string}
     */
    statusText() {
      const s = this.text.status

      if (!this.currentRound) {
        return s.noProgram
      }

      if (this.status === 'running') {
        return `${s.runningPrefix} ${this.currentRound.round} ${s.runningSuffix}`
      }

      if (this.status === 'finished') {
        return s.finished
      }

      return `${s.readyPrefix} ${this.currentRound.round} ${s.readySuffix}`
    }
  },

  watch: {
    /**
     * Whenever Vuex provides a new animation payload,
     * prepare horses and start the animation loop.
     */
    currentAnimation: {
      handler(newVal) {
        if (newVal) {
          this.prepareAnimation(newVal)
          this.startAnimation()
        }
      },
      immediate: false
    }
  },

  methods: {
    /**
     * Prepares internal animation state for a given round.
     *
     * @param {{ distance:number, placements:Array<{horse:{id:number,name:string,color:string},time:number}> }} anim
     */
    prepareAnimation(anim) {
      const roundDurationSec = (anim.distance / 100) * 0.1

      const timeById = new Map(anim.placements.map((p) => [p.horse.id, p.time]))
      const allTimes = Array.from(timeById.values())
      const minTime = Math.min(...allTimes)
      const maxTime = Math.max(...allTimes)
      const diff = maxTime - minTime || 1

      this.animHorses = this.activeHorses.map((h) => {
        const time = timeById.get(h.id) ?? maxTime
        const ratio = (time - minTime) / diff
        const finishAtSec = roundDurationSec * (0.85 + 0.15 * ratio)

        const baseSeed = h.id * 97 + anim.distance * 0.13
        const curveRand = pseudoRand(baseSeed)
        const speedCurve = 0.9 + curveRand * 0.2

        return {
          id: h.id,
          name: h.name,
          color: h.color,
          finishAtSec,
          speedCurve,
          raceProgress: 0,
          progress: 0,
          visualPercent: 0
        }
      })

      this.startTime = null
    },

    /**
     * Starts the requestAnimationFrame loop
     * and updates horse positions until the race visually finishes.
     */
    startAnimation() {
      if (this.frameId) cancelAnimationFrame(this.frameId)

      const step = (timestamp) => {
        if (!this.startTime) this.startTime = timestamp
        const elapsedSec = (timestamp - this.startTime) / 1000

        let allFinished = true

        this.animHorses.forEach((h) => {
          const raw = elapsedSec / h.finishAtSec
          const raceP = Math.min(raw, 1)
          h.raceProgress = raceP

          const displayP = Math.pow(raceP, h.speedCurve)
          h.progress = displayP

          let visualPercent
          if (raw <= 1) {
            visualPercent = displayP * 91
          } else {
            const extra = Math.min(raw - 1, 0.3)
            const extraFactor = extra / 0.3
            visualPercent = 91 + extraFactor * 9
          }

          h.visualPercent = Math.min(visualPercent, 100)

          if (h.visualPercent < 100) {
            allFinished = false
          }
        })

        if (!allFinished) {
          this.frameId = requestAnimationFrame(step)
        } else {
          this.frameId = null
          this.animationCompleted()
        }
      }

      this.frameId = requestAnimationFrame(step)
    },

    /**
     * Notifies Vuex that the current round has finished.
     */
    animationCompleted() {
      this.$store.dispatch('race/finishCurrentRound')
    },

    /**
     * Computes inline style for the horse badge wrapper.
     *
     * @param {{ visualPercent:number, progress:number }} lane
     * @returns {{ left:string, transform:string }}
     */
    horseStyle(lane) {
      const percent =
        lane.visualPercent != null ? lane.visualPercent : (lane.progress || 0) * 91

      return {
        left: '-8px',
        transform: `translateX(${percent}%)`
      }
    },

    /**
     * Returns CSS class for a horse:
     * - "stallion-glow" for the current leader while running
     * - "running" for other horses during the race
     *
     * @param {{ id:number }} lane
     * @returns {string | undefined}
     */
    horseClasses(lane) {
      if (this.status !== 'running') return

      if (lane.id === this.leaderId) {
        return 'stallion-glow'
      }

      return 'running'
    }
  },

  beforeUnmount() {
    if (this.frameId) cancelAnimationFrame(this.frameId)
  }
}
</script>

<template>
  <div class="race-track">
    <header class="race-track__header">
      <div class="race-track__title-group">
        <h2 class="race-track__title">
          {{ text.title }}
        </h2>

        <span v-if="currentRound" class="race-track__subtitle">
          ({{ text.roundLabel }} {{ currentRound.round }} • {{ currentRound.distance }}m)
        </span>
      </div>

      <div
        v-if="totalRounds > 0"
        class="race-track__total"
      >
        {{ text.totalRoundsLabel }}: {{ totalRounds }}
      </div>
    </header>

    <p class="race-track__status">
      {{ statusText }}
    </p>

    <div class="race-track__lanes">
      <div
        v-for="lane in lanes"
        :key="lane.id"
        class="race-track__lane"
      >
        <div class="race-track__inner">
          <div class="race-track__start"></div>

          <div
            class="race-track__horse-wrapper"
            :style="horseStyle(lane)"
          >
            <div
              class="race-track__horse"
              :class="horseClasses(lane)"
              :style="{ backgroundColor: lane.color }"
            >
              🏇🏼
            </div>
          </div>

          <div class="race-track__finish"></div>
        </div>
      </div>
    </div>
  </div>
</template>
