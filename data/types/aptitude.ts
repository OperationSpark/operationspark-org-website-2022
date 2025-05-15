type PossibleAnswer = {
  /** Unique identifier for the answer */
  id: string;
  /** Text of the answer */
  text: string;
  /** Image associated with the answer */
  answerImage?: string;
  /** Indicates if the answer is correct */
  isCorrect: boolean;
};

export type AptitudeQuestion = {
  /** Unique identifier for the question */
  id: string;
  /** Category of the question */
  category: string;
  /** Question text */
  text: string;
  /** Image associated with the question */
  image?: string;
  /** Array of possible answers */
  answers: PossibleAnswer[];
  /** The correct answer ID */
  correct: string;
};
