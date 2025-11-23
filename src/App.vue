<script>
import AppHeader from "./components/layout/AppHeader.vue";
import GameView from "./display/GameView.vue";

export default {
  components: {
    AppHeader,
    GameView,
  },
};
</script>

<template>
  <div class="min-h-screen bg-hipodrome-base text-text-body">
    <div class="max-w-6xl mx-auto px-4 py-4 lg:py-6">
      <AppHeader class="mb-4 lg:mb-6" />
      <GameView />
    </div>
  </div>
</template>


