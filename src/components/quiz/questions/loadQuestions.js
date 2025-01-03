export const loadQuestions = (quizType) => {
    console.log('Loading data for quiz type:', quizType);
    switch (quizType) {
      case 'quiz-devops-d1':
        return import('./questions-devops-d1');
      case 'quiz-azure-d2':
        return import('./questions-azure-d2');
      default:
        throw new Error('Unknown quiz type');
    }
  };