<script setup lang="ts">
import { ref, onMounted } from 'vue';

const props = defineProps<{
  question: string;
  matches: { left: string; right: string; }[];
}>();

const emit = defineEmits<{
  (e: 'answer', value: Record<string, string>): void;
}>();

const answers = ref<Record<string, string>>({});
const shuffledRights = ref<string[]>([]);
const isDragging = ref(false);

onMounted(() => {
  shuffledRights.value = props.matches
    .map(m => m.right)
    .sort(() => Math.random() - 0.5);
});

const handleDragStart = (event: DragEvent, right: string) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData('text/plain', right);
    isDragging.value = true;
  }
};

const handleDragEnd = () => {
  isDragging.value = false;
};

const handleDragOver = (event: DragEvent) => {
  event.preventDefault();
};

const handleDrop = (event: DragEvent, left: string) => {
  event.preventDefault();
  const right = event.dataTransfer?.getData('text/plain');
  if (right) {
    answers.value[left] = right;
  }
  isDragging.value = false;
};

const submitAnswer = () => {
  if (Object.keys(answers.value).length === props.matches.length) {
    emit('answer', answers.value);
  }
};
</script>

<template>
  <div class="drag-drop">
    <h2 class="question">{{ question }}</h2>
    <div class="matching-container">
      <div class="left-items">
        <div
          v-for="match in matches"
          :key="match.left"
          class="dropzone"
          :class="{ active: isDragging }"
          @dragover="handleDragOver"
          @drop="(e) => handleDrop(e, match.left)"
        >
          <div class="left-item">{{ match.left }}</div>
          <div v-if="answers[match.left]" class="matched-answer">
            {{ answers[match.left] }}
          </div>
        </div>
      </div>
      
      <div class="right-items">
        <div
          v-for="right in shuffledRights"
          :key="right"
          class="draggable"
          :class="{ dragging: isDragging }"
          draggable="true"
          @dragstart="(e) => handleDragStart(e, right)"
          @dragend="handleDragEnd"
        >
          {{ right }}
        </div>
      </div>
    </div>
    <button
      class="button"
      @click="submitAnswer"
      :disabled="Object.keys(answers).length !== matches.length"
    >
      Submit Answer
    </button>
  </div>
</template>

<style scoped>
.drag-drop {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.question {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.matching-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 1rem 0;
}

.left-items,
.right-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.matched-answer {
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: #e5e7eb;
  border-radius: var(--border-radius);
}

.dropzone {
  min-height: 100px;
  border: 2px dashed #e5e7eb;
  border-radius: var(--border-radius);
  margin: 1rem 0;
  padding: 1rem;
  transition: all 0.2s ease;
}

.dropzone.active {
  border-color: var(--primary-color);
  background: #f3f4f6;
}

.draggable {
  cursor: move;
  user-select: none;
  padding: 1rem;
  margin: 0.5rem 0;
  background: #f3f4f6;
  border-radius: var(--border-radius);
  touch-action: none;
  transition: all 0.2s ease;
}

.draggable.dragging {
  opacity: 0.5;
  background: #e5e7eb;
}

@media (max-width: 768px) {
  .matching-container {
    grid-template-columns: 1fr;
  }
}
</style>