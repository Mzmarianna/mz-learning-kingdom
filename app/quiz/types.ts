import type { QuizData } from "./page";

export type { QuizData };

export interface StepProps {
  data: QuizData;
  setData: (data: QuizData) => void;
}
