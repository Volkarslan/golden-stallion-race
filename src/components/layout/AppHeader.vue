<script>
export default {};
</script>

<template>
    <header class="flex items-center justify-between bg-hipodrome-panel rounded-xl px-4 py-3 shadow-sm">
        <div class="flex items-center gap-3">
            <img src="/src/assets/images/game-logo.png" alt="Golden Stallion Logo"
                class="w-10 h-10 rounded-full object-contain" />
            <div class="flex flex-col">
                <span class="text-lg font-semibold text-text-title">
                    Golden Stallion
                </span>
                <span class="text-xs text-text-muted">
                    Race Day Simulation
                </span>
            </div>
        </div>

        <!-- Desktop actions -->
        <div class="hidden gap-2 sm:flex">
            <button class="px-3 py-2 rounded-md text-sm font-medium bg-control-reset text-white">
                Generate Program
            </button>
            <button class="px-3 py-2 rounded-md text-sm font-medium bg-control-start text-white">
                Start Round
            </button>
        </div>

        <!-- Mobile actions: ikonlar (şimdilik boş) -->
        <div class="flex sm:hidden items-center gap-3">
            <button class="w-8 h-8 rounded-full bg-control-reset/10 flex items-center justify-center text-control-reset"
                aria-label="Generate Program">
                🎲
            </button>
            <button class="w-8 h-8 rounded-full bg-control-start/10 flex items-center justify-center text-control-start"
                aria-label="Start Round">
                ▶️
            </button>
        </div>
    </header>
</template>
