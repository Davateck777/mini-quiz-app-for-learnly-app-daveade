<script setup lang="ts">
defineProps<{
  current: number;
  total: number;
}>();
</script>

<template>
  <div class="progress-bar">
    <div
      class="progress-bar__fill"
      :style="{ width: `${(current / total) * 100}%` }"
    ></div>
  </div>
</template>