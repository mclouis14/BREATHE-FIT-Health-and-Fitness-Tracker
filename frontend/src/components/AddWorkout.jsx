import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";

/**
 * Styled component for a card layout.
 * The Card will have a flexible width, a minimum width of 280px, and padding.
 * It will also have a border, rounded corners, and a shadow effect.
 * It adapts to smaller screens with reduced padding.
 */
const Card = styled.div`
  flex: 1;
  min-width: 280px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
  display: flex;
  flex-direction: column;
  gap: 6px;
  @media (max-width: 600px) {
    padding: 16px;
  }
`;

/**
 * Styled component for the title of the workout form.
 * It sets the font-weight and font-size, and adjusts the font-size on smaller screens.
 * The color adapts based on the theme's primary color.
 */
const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.primary};
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

/**
 * AddWorkout component renders a form to add a new workout.
 * 
 * @param {string} workout - The current value of the workout input field.
 * @param {function} setWorkout - Function to update the workout state.
 * @param {function} addNewWorkout - Function to handle adding a new workout.
 * @param {boolean} buttonLoading - Indicates if the "Add Workout" button is in a loading state.
 * 
 * The component includes:
 * - A title
 * - A text input for entering workout details
 * - A button to trigger the submission of the workout
 */
const AddWorkout = ({ workout, setWorkout, addNewWorkout, buttonLoading }) => {
  return (
    <Card>
      <Title>Add New Workout</Title>
      <TextInput
        label="Workout"
        textArea
        rows={10}
        placeholder={`Enter in this format:

#Category
-Workout Name
-Reps
-Sets
-Weight
-Duration`}
        value={workout}
        handelChange={(e) => setWorkout(e.target.value)}
      />
      <Button
        text="Add Workout"
        small
        onClick={() => addNewWorkout()}
        isLoading={buttonLoading}
        isDisabled={buttonLoading}
      />
    </Card>
  );
};

export default AddWorkout;