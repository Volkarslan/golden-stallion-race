// src/core/raceEngine.js

/**
 * Deterministic pseudo-random number generator (mulberry32).
 * Always returns the same sequence for the same seed.
 *
 * @param {number} seed
 * @returns {() => number} A function that returns a float in [0, 1)
 */
function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * @typedef {Object} Horse
 * @property {number} id
 * @property {string} name
 * @property {number} condition - Performance factor (1–100)
 * @property {string} color - HSL color string used for UI
 */

/**
 * @typedef {Object} Round
 * @property {number} round - 1-based round index
 * @property {number} distance - Distance in meters
 * @property {number[]} horses - IDs of horses running in this round
 */

/**
 * @typedef {Object} Placement
 * @property {Horse} horse
 * @property {number} time - Normalized finish time (lower is better)
 */

/**
 * Fake but race-like horse names (20 total).
 * Index is used as ID (1..20).
 * @type {string[]}
 */
const horseNames = [
  'Silver Tempest',
  'Crimson Hoof',
  'Midnight Aurora',
  'Thunder Willow',
  'Obsidian Rush',
  'Golden Mirage',
  'Storm Phantom',
  'Iron Comet',
  'Velvet Blaze',
  'Desert Eclipse',
  'Shadow Gallop',
  'Frost Runner',
  'Copper Dream',
  'Neon Stallion',
  'Blue Torrent',
  'Emerald Vortex',
  'Solar Breaker',
  'Rapid Nova',
  'Windcrusher',
  'Phantom Flash'
];

/**
 * Distances (in meters) used for the 6 rounds.
 * @type {number[]}
 */
const ROUND_DISTANCES = [1200, 1400, 1600, 1800, 2000, 2200];

/**
 * Generates a deterministic HSL color using the provided RNG.
 *
 * @param {() => number} rand - Random generator returning [0, 1)
 * @returns {string} HSL color string
 */
function randomColor(rand) {
  const hue = Math.floor(rand() * 360);
  return `hsl(${hue}, 70%, 55%)`;
}

/**
 * Generates 20 horses using a deterministic seed.
 *
 * @param {number} seed
 * @returns {Horse[]} Array of 20 horses
 */
export function generateHorses(seed) {
  const rand = mulberry32(seed);

  return Array.from({ length: 20 }).map((_, i) => {
    return {
      id: i + 1,
      name: horseNames[i],
      condition: Math.floor(rand() * 100) + 1,
      color: randomColor(rand)
    };
  });
}

/**
 * Picks 10 horses for a single round in a deterministic way.
 * Uses roundIndex to vary the RNG while keeping the same global seed.
 *
 * @param {Horse[]} horses - Full pool of horses (20)
 * @param {number} seed - Global seed
 * @param {number} roundIndex - 1-based round index
 * @returns {Horse[]} Selected 10 horses for this round
 */
function selectRoundHorses(horses, seed, roundIndex) {
  const rand = mulberry32(seed + roundIndex * 1000);
  const shuffled = [...horses].sort(() => rand() - 0.5);
  return shuffled.slice(0, 10);
}

/**
 * Generates 6 rounds of the race program.
 * Each round:
 *  - Has a fixed distance (from ROUND_DISTANCES)
 *  - Selects 10 horses from the 20-horse pool
 *
 * @param {Horse[]} horses
 * @param {number} seed
 * @returns {Round[]} Race rounds
 */
export function generateRounds(horses, seed) {
  return ROUND_DISTANCES.map((distance, index) => {
    const roundIndex = index + 1;
    const selected = selectRoundHorses(horses, seed, roundIndex);

    return {
      round: roundIndex,
      distance,
      horses: selected.map((h) => h.id)
    };
  });
}

/**
 * Calculates race results for a given set of horses and distance.
 * Adds a "surprise factor" to slightly randomize finish times
 * while still respecting the horses' condition values.
 *
 * NOTE:
 * - "horses" param is expected to be the 10 horses participating in this round.
 * - The function is deterministic for the same seed + distance + input order.
 *
 * @param {Horse[]} horses
 * @param {number} distance - Distance in meters
 * @param {number} seed
 * @returns {Placement[]} Sorted placements (ascending by time)
 */
export function calculateResults(horses, distance, seed) {
  const rand = mulberry32(seed + distance);

  return horses
    .map((horse) => {
      const base = distance / (horse.condition + 50);
      const surprise = (rand() - 0.5) * 0.3; // ±30%
      return {
        horse,
        time: Number((base * (1 + surprise)).toFixed(3))
      };
    })
    .sort((a, b) => a.time - b.time);
}
