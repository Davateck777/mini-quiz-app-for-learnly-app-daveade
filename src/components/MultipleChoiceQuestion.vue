<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  question: string;
  options: string[];
  correctAnswer: string;
}>();

const emit = defineEmits<{
  (e: 'answer', value: string): void;
}>();

const selectedAnswer = ref('');

const submitAnswer = () => {
  if (selectedAnswer.value) {
    emit('answer', selectedAnswer.value);
  }
};
</script>

<template>
  <div class="multiple-choice">
    <h2 class="question">{{ question }}</h2>
    <div class="options">
      <label
        v-for="option in options"
        :key="option"
        class="option"
      >
        <input
          type="radio"
          :value="option"
          v-model="selectedAnswer"
          name="answer"
        />
        <span class="option-text">{{ option }}</span>
      </label>
    </div>
    <button
      class="button"
      @click="submitAnswer"
      :disabled="!selectedAnswer"
    >
      Submit Answer
    </button>
  </div>
</template>

<style scoped>
.multiple-choice {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.question {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: var(--border-radius);
  background: #f3f4f6;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.option:hover {
  background: #e5e7eb;
}

.option input[type="radio"] {
  width: 20px;
  height: 20px;
}

.option-text {
  font-size: 1rem;
}
</style>