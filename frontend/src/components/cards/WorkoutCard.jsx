// Import necessary components and icons from external libraries
import { FitnessCenterRounded, TimelapseRounded } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";

// Styled component for the Card container
// The Card has flexible width, padding, and a responsive design with media query for smaller screens.
const Card = styled.div`
  flex: 1;
  min-width: 250px;
  max-width: 400px;
  padding: 16px 18px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
  display: flex;
  flex-direction: column;
  gap: 6px;
  @media (max-width: 600px) {
    padding: 12px 14px;
  }
`;

// Styled component for the Category label
// Displays the workout category with custom styling.
const Category = styled.div`
  width: fit-content;
  font-size: 14px;
  color: ${({ theme }) => theme.primary};
  font-weight: 500;
  background: ${({ theme }) => theme.primary + 20};
  padding: 4px 10px;
  border-radius: 8px;
`;

// Styled component for the workout name
// Shows the name of the workout.
const Name = styled.div`
  font-size: 20px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 600;
`;

// Styled component for the set and rep count
// Displays the number of sets and reps for the workout.
const Sets = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.text_secondary};
  font-weight: 500;
  display: flex;
  gap: 6px;
`;

// Styled component for flexible layout containers
// Used to arrange elements horizontally with spacing.
const Flex = styled.div`
  display: flex;
  gap: 16px;
`;

// Styled component for workout details
// Displays additional details like weight and duration.
const Details = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
`;

/**
 * WorkoutCard Component
 * 
 * A functional component that renders a workout card with information about
 * the workout, including category, name, sets/reps, weight, and duration.
 *
 * @param {Object} props - Contains workout object with details of the workout.
 * @param {string} props.workout.category - The category of the workout (e.g., strength, cardio).
 * @param {string} props.workout.workoutName - The name of the workout.
 * @param {number} props.workout.sets - The number of sets in the workout.
 * @param {number} props.workout.reps - The number of reps per set.
 * @param {number} props.workout.weight - The weight used in the workout (in kg).
 * @param {number} props.workout.duration - The duration of the workout (in minutes).
 */
const WorkoutCard = ({ workout }) => {
  return (
    <Card>
      <Category>#{workout?.category}</Category>
      <Name>{workout?.workoutName}</Name>
      <Sets>
        Count: {workout?.sets} sets X {workout?.reps} reps
      </Sets>
      <Flex>
        <Details>
          <FitnessCenterRounded sx={{ fontSize: "20px" }} />
          {workout?.weight} kg
        </Details>
        <Details>
          <TimelapseRounded sx={{ fontSize: "20px" }} />
          {workout?.duration} min
        </Details>
      </Flex>
    </Card>
  );
};

// Export the WorkoutCard component for use in other files
export default WorkoutCard;