import axios from "axios";

// Create an instance of axios with a predefined base URL for API requests
const API = axios.create({
  baseURL: "https://breathe-fit-health-and-fitness-tracker.onrender.com/api/",
});

// Utility function for handling errors
const handleAxiosError = (error) => {
  if (error.response) {
    // The request was made, and the server responded with a status code out of the 2xx range
    console.error("Server responded with an error:");
    console.error("Status:", error.response.status);
    console.error("Data:", error.response.data); // Details of the error from the server
    console.error("Headers:", error.response.headers);
  } else if (error.request) {
    // The request was made, but no response was received
    console.error("No response received from server:", error.request);
  } else {
    // Something else caused the error
    console.error("Error:", error.message);
  }
};

// Sends a POST request to sign up a new user
export const UserSignUp = async (data) => {
  try {
    const response = await API.post("/user/signup", data);
    return response.data; // Return the API response data
  } catch (error) {
    handleAxiosError(error);
    throw error; // Optionally re-throw the error after handling it
  }
};

// Sends a POST request to sign in an existing user
export const UserSignIn = async (data) => {
  try {
    const response = await API.post("/user/signin", data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

// Sends a GET request to retrieve dashboard details for the authenticated user
export const getDashboardDetails = async (token) => {
  try {
    const response = await API.get("/user/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

// Sends a GET request to retrieve the user's workout for a specified date
export const getWorkouts = async (token, date) => {
  try {
    const response = await API.get(`/user/workout${date}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

// Sends a POST request to add a new workout for the authenticated user
export const addWorkout = async (token, data) => {
  try {
    const response = await API.post("/user/workout", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};