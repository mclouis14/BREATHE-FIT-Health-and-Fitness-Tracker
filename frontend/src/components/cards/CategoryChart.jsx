// Import necessary libraries and components
import React from "react";
import styled from "styled-components";
import { PieChart } from "@mui/x-charts/PieChart";

// Styled-component 'Card' for styling the container
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
// Styled-component 'Title' for styling the title of the chart
const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.primary};
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

/**
 * CategoryChart Component
 * @param {Object} data - The data prop passed into the component, containing pie chart data.
 * 
 * This component renders a styled card with a title and a PieChart using data passed via props.
 * The PieChart displays weekly calorie burn information.
 */
const CategoryChart = ({ data }) => {
  return (
    <Card>
      <Title>Weekly Calories Burned</Title>
      {data?.pieChartData && (
        <PieChart
          series={[
            {
              data: data?.pieChartData,
              innerRadius: 30,
              outerRadius: 100,
              paddingAngle: 5,
              cornerRadius: 5,
            },
          ]}
          height={300}
        />
      )}
    </Card>
  );
};

// Export the CategoryChart component as the default export
export default CategoryChart;