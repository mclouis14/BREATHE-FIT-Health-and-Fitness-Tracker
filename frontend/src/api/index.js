import axios from "axios";

// Create an instance of axios with a predefined base URL for API requests
const API = axios.create({
  baseURL: "https://breathe-fit-health-and-fitness-tracker.onrender.com/api/",
});

// Sends a POST request to sign up a new user
export const UserSignUp = async (data) => API.post("/user/signup", data);

// Sends a POST request to sign in an existing user
export const UserSignIn = async (data) => API.post("/user/signin", data);

// Sends a GET request to retrieve dashboard details for the authenticated user
export const getDashboardDetails = async (token) =>
  API.get("/user/dashboard", {
    headers: { Authorization: `Bearer ${token}` },
  });

 // Sends a GET request to retrieve the user's workout for a specified date
export const getWorkouts = async (token, date) =>
  await API.get(`/user/workout${date}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  /**
 * Sends a POST request to add a new workout for the authenticated user.
 *
 * @param {string} token - The authorization token of the authenticated user.
 * @param {Object} data - The workout details such as exercise type, duration, and date.
 * @returns {Promise} - The response from the API confirming the workout was added.
 */
export const addWorkout = async (token, data) =>
  await API.post(`/user/workout`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });