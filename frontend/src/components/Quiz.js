import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useViewportSize } from '../hooks/useViewportSize';

const QuizContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.scale * 2}rem ${props => props.scale}rem;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f8f9fa;

  @media (max-width: 768px) {
    padding: ${props => props.scale}rem;
  }
`;

const QuizHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.scale * 1}rem;
  padding: ${props => props.scale}rem;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);

  @media (max-width: 480px) {
    flex-direction: column;
    gap: ${props => props.scale}rem;
    text-align: center;
  }
`;

const QuestionSection = styled.div` 
  display: flex; 
  flex-direction: column; 
  gap: 2rem;
  background-color: #ffffff;
  padding: ${props => props.scale * 1}rem;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin-bottom: ${props => props.scale * 2}rem;
  font-size: max(1.3rem, calc(1rem * ${props => props.scale}));

`;

const AnswerSection = styled.div`
  display: grid;
  gap: ${props => props.scale}rem;
`;

const OptionLabel = styled.label`
  display: flex;
  align-items: center;
  padding: ${props => props.scale * 1.2}rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: #ffffff;
  font-size: max(1rem, calc(1.5rem * ${props => props.scale}));
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    border-color: #4dabf7;
  }

  input {
    margin-right: ${props => props.scale}rem;
    width: 1.2em;
    height: 1.2em;
  }
`;

const NavigationControls = styled.div`
  display: flex;
  justify-content: space-around;
  gap: ${props => props.scale}rem;
  margin: ${props => props.scale * 2}rem 0;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const BaseButton = styled.button`
  padding:1rem 2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  font-size: max(1rem, calc(1.1rem * ${props => props.scale}));
`;

const NavButton = styled(BaseButton)`
  background-color: #4dabf7;
  color: white;
  display: flex;
  align-items: center;
  gap: ${props => props.scale * 0.5}rem;

  &:disabled {
    background-color: #e9ecef;
    color: #adb5bd;
    cursor: not-allowed;
    opacity: 0.7;
  }

  &:not(:disabled):hover {
    background-color: #339af0;
    box-shadow: 0 2px 8px rgba(51, 154, 240, 0.3);
  }

  &:first-child {
    background-color: #f8f9fa;
    color: #2c3e50;
    border: 2px solid #dee2e6;

    &:not(:disabled):hover {
      background-color: #f1f3f5;
      border-color: #4dabf7;
      color: #339af0;
    }
  }

  // &::before {
  //   content: '←';
  //   font-size: calc(1.2rem * ${props => props.scale});
  // }

  // &:nth-child(3)::after {
  //   content: '→';
  //   font-size: calc(1.2rem * ${props => props.scale});
  // }
`;

const MarkReviewButton = styled(BaseButton)`
  background-color: #ffd43b;
  color: #2c3e50;

  &:hover {
    background-color: #fab005;
  }
`;

const FinishButton = styled(BaseButton)`
  background-color: #69db7c;
  color: white;

  &:hover {
    background-color: #51cf66;
  }
`;

const QuestionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
  gap: ${props => props.scale}rem;
  margin-top: max(2rem, ${({ scale }) => scale * 2}rem);
  padding: ${props => props.scale}rem;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(45px, 1fr));
  }
`;

const GridItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: max(50px, ${props => props.scale * 50}px);
  border: 2px solid #dee2e6;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  font-size: max(1rem, calc(1.1rem * ${props => props.scale}));

  ${props => props.current && `
    border-color: #4dabf7;
    background-color: #e7f5ff;
    color: #339af0;
  `}

  ${props => props.answered && `
    background-color: #69db7c;
    color: white;
    border-color: #69db7c;
  `}

  ${props => props.marked && `
    background-color: #ffd43b;
    color: #2c3e50;
    border-color: #ffd43b;
  `}
`;

const ResultContainer = styled.div`
  text-align: center;
  padding: 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
`;

const ResultCard = styled.div`
  padding: 3rem;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  max-width: 600px;
  width: 90%;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  h2 {
    color: #2c3e50;
    margin-bottom: 1.5rem;
  }
  p {
    font-size: 1.2rem;
    margin: 1rem 0;
    color: #495057;
  }
  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const RetryButton = styled(BaseButton)`
  background-color: #4dabf7;
  color: white;
  margin-top: 2rem; 
  padding: 15px 10px;
  &:hover {
    background-color: #339af0;
  }
`;

const Quiz = () => {
  const { width: vpWidth, height: vpHeight } = useViewportSize();
  const sizeScale = Math.min(vpWidth / 1400, vpHeight / 800, 1.2);
  const mobileScale = vpWidth < 768 ? Math.min(vpWidth / 500, 1) : 1;
  const scaleFactor = sizeScale * mobileScale;

  const [quizzes, setQuizzes] = useState([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [showScore, setShowScore] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [markedQuestions, setMarkedQuestions] = useState(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('https://quiz-server-one-liard.vercel.app/api/quiz');
        setQuizzes(response.data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };
    fetchQuizzes();
  }, []);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    setAnsweredQuestions(prev => ({
      ...prev,
      [currentQuizIndex]: e.target.value
    }));
  };

  const handleMarkReview = () => {
    setMarkedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(currentQuizIndex)) {
        newSet.delete(currentQuizIndex);
      } else {
        newSet.add(currentQuizIndex);
      }
      return newSet;
    });
  };

  const handleQuestionNavigation = (index) => {
    if (index >= 0 && index < quizzes.length) {
      setCurrentQuizIndex(index);
      setSelectedOption(answeredQuestions[index] || '');
    }
  };

  const calculateResults = () => {
    let correct = 0;
    quizzes.forEach((quiz, index) => {
      if (answeredQuestions[index] === quiz.correctAnswer) {
        correct++;
      }
    });
  
    const attempted = Object.keys(answeredQuestions)
      .filter(index => !markedQuestions.has(Number(index))).length;
  
    const marked = markedQuestions.size;
  
    const unattempted = quizzes.length - attempted - marked;
  
    return {
      total: quizzes.length,
      correct,
      percentage: ((correct / quizzes.length) * 100).toFixed(2),
      attempted,
      marked,
      unattempted,
    };
  };
  
  
  const handleFinish = () => {
    const results = calculateResults();
    setShowScore(true);
  };

  if (quizzes.length === 0) return <div>Loading...</div>;

  if (showScore) {
    const results = calculateResults();
    return (
      <ResultContainer>
        <h2>Your Results</h2>
        <ResultCard>
          <p>Score: {results.correct}/{results.total}</p>
          <p>Percentage: {results.percentage}%</p>
          <p>Attempted: {results.attempted}</p>
          <p>Unattempted: {results.unattempted}</p>
          <p>Marked for Review: {results.marked}</p>
        </ResultCard>
        <RetryButton 
          scale={scaleFactor}
          onClick={() => {
            navigate('/');
            window.location.reload();
          }}
        >
          Retry Test
        </RetryButton>
      </ResultContainer>
    );
  }
  

  const currentQuiz = quizzes[currentQuizIndex];

  return (
    <QuizContainer scale={scaleFactor}>
      <QuizHeader scale={scaleFactor}>
        <h2>Question {currentQuizIndex + 1}</h2>
      </QuizHeader>

      <QuestionSection scale={scaleFactor}>
        <div>{currentQuiz.question}</div>
        <AnswerSection scale={scaleFactor}>
          {currentQuiz.options.map((option, index) => (
            <OptionLabel 
              key={index} 
              scale={scaleFactor}
            >
              <input
                type="radio"
                name="quiz-option"
                value={option}
                checked={selectedOption === option}
                onChange={handleOptionChange}
              />
              <span>{option}</span>
            </OptionLabel>
          ))}
        </AnswerSection>
      </QuestionSection>

      <NavigationControls scale={scaleFactor}>
        <NavButton 
          scale={scaleFactor}
          disabled={currentQuizIndex === 0}
          onClick={() => handleQuestionNavigation(currentQuizIndex - 1)}
        >
          Previous
        </NavButton>
        <MarkReviewButton 
          scale={scaleFactor}
          onClick={handleMarkReview}
        >
          {markedQuestions.has(currentQuizIndex) ? 'Unmark Review' : 'Mark for Review'}
        </MarkReviewButton>
        {currentQuizIndex < quizzes.length - 1 ? (
          <NavButton 
            scale={scaleFactor}
            onClick={() => handleQuestionNavigation(currentQuizIndex + 1)}
          >
            Next
          </NavButton>
        ) : (
          <FinishButton 
            scale={scaleFactor}
            onClick={handleFinish}
          >
            Finish
          </FinishButton>
        )}
      </NavigationControls>

      <QuestionGrid scale={scaleFactor}>
        {quizzes.map((_, index) => (
          <GridItem
            key={index}
            scale={scaleFactor}
            current={currentQuizIndex === index}
            answered={answeredQuestions[index]}
            marked={markedQuestions.has(index)}
            onClick={() => handleQuestionNavigation(index)}
          >
            {index + 1}
          </GridItem>
        ))}
      </QuestionGrid>
    </QuizContainer>
  );
};

export default Quiz;