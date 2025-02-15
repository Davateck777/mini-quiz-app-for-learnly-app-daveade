<script setup lang="ts">
import { ref, computed } from 'vue';
import ProgressBar from './components/ProgressBar.vue';
import MultipleChoiceQuestion from './components/MultipleChoiceQuestion.vue';
import DragDropQuestion from './components/DragDropQuestion.vue';
import ResultDisplay from './components/ResultDisplay.vue';
import quizData from './data/quiz-data.json';
import type { QuizState } from './types/quiz';

const quizState = ref<QuizState>({
  currentQuestionIndex: 0,
  score: 0,
  answers: {},
  isComplete: false
});

const currentQuestion = computed(() => quizData.questions[quizState.value.currentQuestionIndex]);

const handleAnswer = (answer: any) => {
  const question = currentQuestion.value;
  quizState.value.answers[question.id] = answer;
  
  // Check if answer is correct
  if (question.type === 'multiple-choice') {
    if (answer === question.correctAnswer) {
      quizState.value.score++;
    }
  } else if (question.type === 'drag-drop') {
    const correctMatches = Object.entries(answer).every(
      ([key, value]) => question.correctAnswer[key] === value
    );
    if (correctMatches) {
      quizState.value.score++;
    }
  }

  // Move to next question or complete quiz
  if (quizState.value.currentQuestionIndex < quizData.questions.length - 1) {
    quizState.value.currentQuestionIndex++;
  } else {
    quizState.value.isComplete = true;
  }
};

const restartQuiz = () => {
  quizState.value = {
    currentQuestionIndex: 0,
    score: 0,
    answers: {},
    isComplete: false
  };
};
</script>

<template>
  <div class="container">
    <div v-if="!quizState.isComplete" class="quiz-container">
      <ProgressBar
        :current="quizState.currentQuestionIndex + 1"
        :total="quizData.questions.length"
      />
      
      <div class="question-card">
        <template v-if="currentQuestion.type === 'multiple-choice'">
          <MultipleChoiceQuestion
            :question="currentQuestion.question"
            :options="currentQuestion.options"
            :correctAnswer="currentQuestion.correctAnswer"
            @answer="handleAnswer"
          />
        </template>
        
        <template v-else-if="currentQuestion.type === 'drag-drop'">
          <DragDropQuestion
            :question="currentQuestion.question"
            :matches="currentQuestion.matches"
            @answer="handleAnswer"
          />
        </template>
      </div>
    </div>
    
    <ResultDisplay
      v-else
      :score="quizState.score"
      :totalQuestions="quizData.questions.length"
      @restart="restartQuiz"
    />
  </div>
</template>

<style scoped>
.quiz-container {
  max-width: 800px;
  margin: 2rem auto;
}

.question-card {
  background: white;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-top: 1rem;
}
</style>