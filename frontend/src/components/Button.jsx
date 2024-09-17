// Import necessary libraries and components
import { CircularProgress } from "@mui/material"; // Progress indicator from Material UI
import React from "react"; // React library for building UI components
import styled from "styled-components"; // Library for writing CSS in JS

// Define a styled component for the button
const Button = styled.div`
  border-radius: 10px;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: min-content;
  padding: 16px 26px;
  box-shadow: 1px 20px 35px 0px ${({ theme }) => theme.primary + 40};
  border: 1px solid ${({ theme }) => theme.primary};
  @media (max-width: 600px) {
    padding: 8px 12px;
  }

  // Conditional styling based on the "type" prop
  ${({ type, theme }) =>
    type === "secondary"
      ? `
  background: ${theme.secondary};
border: 1px solid ${({ theme }) => theme.secondary};
  `
      : `
  background: ${theme.primary};
`}

// Conditional styling for disabled state
  ${({ isDisabled }) =>
    isDisabled &&
    `
  opacity: 0.8;
  cursor: not-allowed;

  // Conditional styling for loading state
  `}
  ${({ isLoading }) =>
    isLoading &&
    `
    opacity: 0.8;
  cursor: not-allowed;
`}

// Conditional styling when the "flex" prop is passed
${({ flex }) =>
    flex &&
    `
    flex: 1;
`}

// Conditional styling for small-sized button
${({ small }) =>
    small &&
    `
padding: 10px 28px;
`}

// Conditional styling for outlined button
  ${({ outlined, theme }) =>
    outlined &&
    `
background: transparent;
color: ${theme.primary};
  box-shadow: none;
`}

// Conditional styling for full-width button
  ${({ full }) =>
    full &&
    `
  width: 100%;`}
`;

// Button component definition
const button = ({
  text,
  isLoading,
  isDisabled,
  rightIcon,
  leftIcon,
  type,
  onClick,
  flex,
  small,
  outlined,
  full,
}) => {
  return (
    <Button
      onClick={() => !isDisabled && !isLoading && onClick()}
      isDisabled={isDisabled}
      type={type}
      isLoading={isLoading}
      flex={flex}
      small={small}
      outlined={outlined}
      full={full}
    >
      {isLoading && (
        <CircularProgress
          style={{ width: "18px", height: "18px", color: "inherit" }}
        />
      )}
      {leftIcon}
      {text}
      {isLoading && <> . . .</>}
      {rightIcon}
    </Button>
  );
};

// Export the button component for use in other files
export default button;