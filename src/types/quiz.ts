export interface Question {
  id: number;
  type: 'multiple-choice' | 'drag-drop';
  question: string;
  options?: string[];
  matches?: {
    left: string;
    right: string;
  }[];
  correctAnswer: string | { [key: string]: string };
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  answers: Record<number, any>;
  isComplete: boolean;
}