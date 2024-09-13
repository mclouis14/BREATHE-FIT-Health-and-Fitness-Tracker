/*
 * Counts Data Configuration
 * 
 * This file exports an array of objects that represent various fitness metrics (calories burned, workouts, and average calories burned). 
 * Each object contains metadata like the name, icon, description, key, unit, and associated colors.
 */

import {
    FitnessCenterRounded,
    LocalFireDepartmentRounded,
    TimelineRounded,
  } from "@mui/icons-material";
  
  // Array of fitness metric configurations
  export const counts = [
    {
      name: "Calories Burned",
      icon: (
        <LocalFireDepartmentRounded sx={{ color: "inherit", fontSize: "26px" }} />
      ), // Icon for calories burned
      desc: "Total calories burned today",
      key: "totalCaloriesBurnt",
      unit: "kcal",
      color: "#eb9e34",
      lightColor: "#FDF4EA",
    },
    {
      name: "Workouts",
      icon: <FitnessCenterRounded sx={{ color: "inherit", fontSize: "26px" }} />,
      desc: "Total no of workouts for today",
      key: "totalWorkouts",
      unit: "", // No unit for this metric
      color: "#41C1A6",
      lightColor: "#E8F6F3",
    },
    {
      name: "Average  Calories Burned",
      icon: <TimelineRounded sx={{ color: "inherit", fontSize: "26px" }} />,
      desc: "Average Calories Burned on each workout",
      key: "avgCaloriesBurntPerWorkout",
      unit: "kcal",
      color: "#FF9AD5",
      lightColor: "#FEF3F9",
    },
  ];