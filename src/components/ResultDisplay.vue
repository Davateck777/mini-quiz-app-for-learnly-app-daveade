<script setup lang="ts">
defineProps<{
  score: number;
  totalQuestions: number;
}>();

const emit = defineEmits<{
  (e: 'restart'): void;
}>();
</script>

<template>
  <div class="results">
    <h2>Quiz Complete!</h2>
    <div class="score">
      <p>Your Score:</p>
      <p class="score-value">{{ score }} / {{ totalQuestions }}</p>
      <p class="percentage">
        ({{ Math.round((score / totalQuestions) * 100) }}%)
      </p>
    </div>
    <button class="button" @click="$emit('restart')">
      Try Again
    </button>
  </div>
</template>

<style scoped>
.results {
  text-align: center;
  padding: 2rem;
}

.score {
  margin: 2rem 0;
  font-size: 1.25rem;
}

.score-value {
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--primary-color);
  margin: 1rem 0;
}

.percentage {
  font-size: 1.5rem;
  color: var(--text-color);
  opacity: 0.8;
}
</style>