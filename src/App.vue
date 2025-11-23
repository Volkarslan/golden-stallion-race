<script>
import AppHeader from './components/layout/AppHeader.vue';
import GameView from './display/GameView.vue';

export default {
  name: 'AppRoot',
  components: {
    AppHeader,
    GameView
  }
};
</script>

<template>
  <div class="app-shell">
    <div class="app-container">
      <AppHeader class="mb-4 lg:mb-6" />
      <main class="flex-1">
        <GameView />
      </main>
    </div>
  </div>
</template>
