import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

export const Logo = styled.div`
  position: absolute;
  top: 40px;
  left: 40px;
  font-size: 1.2rem;
  font-weight: 300;
  letter-spacing: 0.1rem;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  font-family: "Roboto", sans-serif;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const FormWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: #121212;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 6px 15px rgba(255, 255, 255, 0.1); /* Subtle light shadow */
  margin-left: 10%;

  @media (max-width: 768px) {
    margin: 0 auto;
    max-width: 80%;
  }
`;

export const TextContent = styled.div`
  margin-left: 18%;
  color: ${({ theme }) => theme.colors.white};

  @media (max-width: 768px) {
    display: none; /* Hide text content on smaller screens */
  }
`;

export const Heading = styled.h1`
  font-size: ${({ theme }) => theme.typography.sizes.hero};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-weight: ${({ theme }) => theme.typography.weights.regular};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme }) => theme.colors.white};

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.sizes.hero};
  }
`;

export const Paragraph = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.body};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-weight: ${({ theme }) => theme.typography.weights.regular};
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.white};

  @media (max-width: 768px) {
    display: none; /* Hide paragraph on smaller screens */
  }
`;

const drawKayak = keyframes`
  0% {
    stroke-dashoffset: 300; /* Hidden */
    opacity: 0;
  }
  50% {
    opacity: 1;
    stroke-dashoffset: 0; /* Fully drawn */
  }
  100% {
    stroke-dashoffset: 300; /* Hidden again */
    opacity: 0;
  }
`;

export const ErrorMessage = styled.p`
  color: #ff6b6b;
  font-size: 1rem;
  text-align: center;
  margin-top: 1rem;
`;

export const Button = styled.button`
  width: 100%; /* Full width */
  background: linear-gradient(135deg, #6a5acd, #483d8b);
  color: #ffffff;
  padding: 14px; /* Increased padding for height */
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.2rem; /* Slightly larger font size */
  font-weight: 600;

  &:hover {
    background: linear-gradient(135deg, #483d8b, #6a5acd);
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-height: 95vh;
  background: radial-gradient(
      circle at top left,
      rgba(25, 30, 60, 1) 0%,
      rgba(20, 25, 50, 0.9) 40%,
      rgba(10, 15, 30, 1) 100%
    ),
    linear-gradient(
      135deg,
      rgba(88, 70, 246, 0.3) 0%,
      rgba(26, 115, 232, 0.2) 60%,
      rgba(20, 25, 50, 1) 100%
    );
  background-color: #0a0f1e;
  padding: 0 10%;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4); /* Subtle shadow for the container */

  @media (max-width: 768px) {
    flex-direction: column; /* Stack items vertically */
    align-items: center;
    padding: 20px;
  }
`;

export const KayakAnimationContainer = styled.div`
  position: absolute;
  top: 15%;
  right: 20%;
  width: 200px;
  height: 100px;

  svg .kayak-path {
    animation: ${drawKayak} 5s ease-in-out infinite;
  }

  @media (max-width: 768px) {
    position: relative; /* Move above the form */
    top: 0;
    right: 0;
    margin-bottom: 20px;
  }
`;

export const SocialIconsContainer = styled.div`
  position: absolute;
  bottom: 40px;
  right: 40px;
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    position: static; /* Center on smaller screens */
    margin-top: 20px;
  }
`;

export const SocialIcon = styled.a`
  color: #ffffff;
  font-size: 1.5rem;
  transition: color 0.3s;

  &:hover {
    color: #1a73e8;
  }
`;
