// Import necessary modules and components
import { CloseRounded, Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
import styled from "styled-components";

// Define a styled container for the input components, using Flexbox for layout
const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

// Define a styled label component with dynamic styling based on error, small, and popup props
const Label = styled.label`
  font-size: 12px;
  color: ${({ theme }) => theme.text_primary};
  padding: 0px 4px;
  ${({ error, theme }) =>
    error &&
    `
    color: ${theme.red};
  `}
  ${({ small }) =>
    small &&
    `
    font-size: 8px;
  `}
  ${({ popup, theme }) =>
    popup &&
    `
  color: ${theme.popup_text_secondary};
  `}
`;

// Define a styled input container with dynamic styles for different input types
const OutlinedInput = styled.div`
  border-radius: 8px;
  border: 0.5px solid ${({ theme }) => theme.text_secondary};
  background-color: transparent;
  color: ${({ theme }) => theme.text_primary};
  outline: none;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  &:focus-within {
    border-color: ${({ theme }) => theme.secondary};
  }
  ${({ error, theme }) =>
    error &&
    `
    border-color: ${theme.red};
  `}

  ${({ chipableInput, height, theme }) =>
    chipableInput &&
    `
    background: ${theme.card};
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    min-height: ${height}
  `}

  ${({ small }) =>
    small &&
    `
    border-radius: 6px;
    padding: 8px 10px;
  `}

  ${({ popup, theme }) =>
    popup &&
    `
  color: ${theme.popup_text_secondary};
  border: 0.5px solid ${theme.popup_text_secondary + 60};
  `}
`;

// Define the actual input field with dynamic styling
const Input = styled.input`
  width: 100%;
  font-size: 14px;
  outline: none;
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.text_primary};
  &:focus {
    outline: none;
  }
  ${({ small }) =>
    small &&
    `
    font-size: 12px;
  `}

  ${({ popup, theme }) =>
    popup &&
    `
  color: ${theme.popup_text_secondary};
  `} ${({ theme }) => theme.popup_text_secondary};
`;

// Define a styled error message with dynamic styling
const Error = styled.p`
  font-size: 12px;
  margin: 0px 4px;
  color: ${({ theme }) => theme.red};
  ${({ small }) =>
    small &&`font-size: 8px;`}
`;

// Define a wrapper for displaying chips (tags) inside the input field
const ChipWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

// Define a styled component for each individual chip (tag)
const Chip = styled.div`
  padding: 5px 10px;
  border-radius: 8px;
  background: ${({ theme }) => theme.primary + 10};
  color: ${({ theme }) => theme.primary};
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
`;

/**
 * TextInput component renders a customizable text input field
 * @param {Object} props - The props for the component
 * @param {string} props.label - Label for the input field
 * @param {string} props.placeholder - Placeholder text for the input field
 * @param {string} props.name - Name attribute for the input field
 * @param {string} props.value - Current value of the input field
 * @param {string} props.error - Error message for the input field
 * @param {function} props.handleChange - Function to handle changes in input value
 * @param {boolean} props.textArea - Whether the input is a textarea
 * @param {number} props.rows - Number of rows for textarea (if applicable)
 * @param {number} props.columns - Number of columns for textarea (if applicable)
 * @param {boolean} props.chipableInput - Whether the input supports chips
 * @param {Array} props.chipableArray - Array of chips (tags) to display
 * @param {function} props.removeChip - Function to remove a chip from the input
 * @param {string} props.height - Height of the input field (for chipable inputs)
 * @param {boolean} props.small - Whether the input should be rendered small
 * @param {boolean} props.popup - Whether the input is rendered in a popup
 * @param {boolean} props.password - Whether the input is for a password
 */
const TextInput = ({
  label,
  placeholder,
  name,
  value,
  error,
  handleChange,
  textArea,
  rows,
  columns,
  chipableInput,
  chipableArray,
  removeChip,
  height,
  small,
  popup,
  password,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Container small={small}>
      <Label small={small} popup={popup} error={error}>
        {label}
      </Label>
      <OutlinedInput
        small={small}
        popup={popup}
        error={error}
        chipableInput={chipableInput}
        height={height}
      >
        {chipableInput ? (
          <ChipWrapper>
            {chipableArray.map((chip, index) => (
              <Chip key={index}>
                <span>{chip}</span>
                <CloseRounded
                  sx={{ fontSize: "14px" }}
                  onClick={() => removeChip(name, index)}
                />
              </Chip>
            ))}
            <Input
              placeholder={placeholder}
              name={name}
              value={value}
              onChange={(e) => handleChange(e)}
            />
          </ChipWrapper>
        ) : (
          <>
            <Input
              popup={popup}
              small={small}
              as={textArea ? "textarea" : "input"}
              name={name}
              rows={rows}
              columns={columns}
              placeholder={placeholder}
              value={value}
              onChange={(e) => handleChange(e)}
              type={password && !showPassword ? "password" : "text"}
            />
            {password && (
              <>
                {showPassword ? (
                  <>
                    <Visibility onClick={() => setShowPassword(false)} />
                  </>
                ) : (
                  <>
                    <VisibilityOff onClick={() => setShowPassword(true)} />
                  </>
                )}
              </>
            )}
          </>
        )}
      </OutlinedInput>
      {error && (
        <Error small={small} popup={popup}>
          {error}
        </Error>
      )}
    </Container>
  );
};

export default TextInput;