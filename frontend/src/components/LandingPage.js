// src/components/LandingPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useViewportSize } from '../hooks/useViewportSize';
import styled from 'styled-components';

const LandingContainer = styled.div`
  ${({ $vpWidth, $vpHeight }) => `
    --base-scale: ${Math.min($vpWidth / 1200, $vpHeight / 600)};
    --mobile-scale: ${$vpWidth < 768 ? Math.min($vpWidth / 400, 1) : 1};
    --flex-direction: ${$vpWidth > 800 ? 'row' : 'column'};
  `}

  min-height: 100vh;
  background: linear-gradient(135deg, #1e1e2f 0%, #2d2d44 100%);
  color: white;
  padding: calc(2rem * var(--base-scale) * var(--mobile-scale));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const DynamicText = styled.h1`
  font-size: max(1.5rem, calc(3rem * var(--base-scale) * var(--mobile-scale)));
  margin-bottom: calc(3rem * var(--base-scale) * var(--mobile-scale));
  line-height: 1.3;
  background: linear-gradient(45deg, #fff 30%, #a5b4fc 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  max-width: 90%;
`;

const FeatureGrid = styled.div`
  display: flex;
  flex-direction: var(--flex-direction);
  flex-wrap: wrap;
  gap: calc(2rem * var(--base-scale) * var(--mobile-scale));
  margin: calc(3rem * var(--base-scale) * var(--mobile-scale)) 0;
  // width: min(100%, calc(2000px * var(--base-scale)));
  justify-content: center;
  align-items: center;
`;


const FeatureCard = styled.div`
  flex: 1 1 calc(33% - 2rem * var(--base-scale) * var(--mobile-scale));
  min-width: max(100px, calc(250px * var(--base-scale) * var(--mobile-scale)));
  max-width: ${props => props.$vpWidth > 600 ? '10000px' : '100%'};
  background: rgba(255, 255, 255, 0.05);
  padding: calc(1rem * var(--base-scale) * var(--mobile-scale));
  border-radius: calc(1.5rem * var(--base-scale) * var(--mobile-scale)); 
  backdrop-filter: blur(8px);
  transition: transform 0.2s ease;
  margin: calc(0.5rem * var(--base-scale) * var(--mobile-scale));

  &:hover {
    transform: translateY(-3px);
  }

  h3 {
    font-size: max(1rem,  calc(1.2rem * var(--base-scale) * var(--mobile-scale)));
    margin-bottom: calc(0.8rem * var(--base-scale) * var(--mobile-scale)); // Increased spacing
  }

  p {
    font-size: max(1rem,  calc(1.2rem * var(--base-scale) * var(--mobile-scale)));
    opacity: 0.9;
    line-height: 1.5;
  }
`; 


const StartButton = styled.button`
  background: #6366f1;
  color: white;
  border: none;
  padding: max(2rem, calc(1rem * var(--base-scale) * var(--mobile-scale)) )
           max(2rem, calc(1rem * var(--base-scale) * var(--mobile-scale)) );
  border-radius: calc(2rem * var(--base-scale) * var(--mobile-scale));
  font-size:  font-size: max(2rem,  calc(1.2rem * var(--base-scale) * var(--mobile-scale)));;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.4s;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    background: #4f46e5;
    box-shadow: 0 4px 20px rgba(99, 102, 241, 0.3);
    transform: scale(1.05);
  }
`;

const LandingPage = () => {
  const navigate = useNavigate();
  const { width: vpWidth, height: vpHeight } = useViewportSize();

  const features = [
    { title: "Easy Practice", desc: "Simple and user-friendly UI" },
    { title: "Instant Results", desc: "Track scores in real time" },
];


  return (
    <LandingContainer $vpWidth={vpWidth} $vpHeight={vpHeight}>
      <DynamicText>
        Master Your Skills with<br />
        Intelligent Quizzing
      </DynamicText>

      <FeatureGrid>
        {features.map((feature, index) => (
          <FeatureCard key={index} $vpWidth={vpWidth}>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </FeatureCard>
        ))}
      </FeatureGrid>

      <StartButton onClick={() => navigate('/quiz')}>
        Start Challenge
      </StartButton>
    </LandingContainer>
  );
};

export default LandingPage;