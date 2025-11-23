<script>
import HorseList from '@/components/game/HorseList.vue';
import RaceTrack from '@/components/game/RaceTrack.vue';
import RaceResult from '@/components/game/RaceResult.vue';
import AppOverlay from '@/components/layout/AppOverlay.vue';

export default {
  name: 'GameView',
  components: {
    HorseList,
    RaceTrack,
    RaceResult,
    AppOverlay
  }
};
</script>

<template>
  <div
    class="grid gap-4 grid-cols-1 lg:grid-cols-[minmax(220px,260px)_minmax(0,1.4fr)_minmax(260px,320px)]"
  >
    <div class="panel">
      <HorseList />
    </div>

    <div class="panel">
      <RaceTrack />
    </div>

    <div class="panel">
      <RaceResult />
    </div>

    <AppOverlay />
  </div>
</template>