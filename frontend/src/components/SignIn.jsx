// Import necessary modules and components from React, styled-components, and other dependencies.
import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";
import { UserSignIn } from "../api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/reducers/userSlice";

// Styled component for the container that holds the form elements.
const Container = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

// Styled component for the title text.
const Title = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary};
`;

// Styled component for the subtitle text.
const Span = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 90};
`;

// Function to validate if both email and password are filled.
const SignIn = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to validate if both email and password are filled.
  const validateInputs = () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return false;
    }
    return true;
  };

  // Async function to handle the sign-in process.
  const handleSignIn = async () => {
    setLoading(true);
    setButtonDisabled(true);

    // If inputs are valid, proceed with API call for sign-in.
    if (validateInputs()) {
      await UserSignIn({ email, password })
        .then((res) => {
          dispatch(loginSuccess(res.data));
          alert("Login Success");
          setLoading(false);
          setButtonDisabled(false);
        })
        .catch((err) => {
          alert(err.response.data.message);
          setLoading(false);
          setButtonDisabled(false);
        });
    }
  };

  // JSX structure to render the sign-in form.
  return (
    <Container>
      <div>
        <Title>Welcome to BREATHE FIT 👋</Title>
        <Span>Please login with your details here</Span>
      </div>
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexDirection: "column",
        }}
      >
        <TextInput
          label="Email Address"
          placeholder="Enter your email address"
          value={email}
          handleChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          label="Password"
          placeholder="Enter your password"
          password
          value={password}
          handleChange={(e) => setPassword(e.target.value)}
        />
        <Button
          text="SignIn"
          onClick={handleSignIn}
          isLoading={loading}
          isDisabled={buttonDisabled}
        />
      </div>
    </Container>
  );
};

// Export the SignIn component as the default export.
export default SignIn;