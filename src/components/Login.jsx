import React from "react";
import { Button } from "@mui/material";
import styled from "styled-components";
import { BsGoogle } from "react-icons/bs";
import { signInWithRedirect } from "firebase/auth";
import { auth, provider } from "../firebase";
const LoginStyled = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonStyled = styled(Button)`
  background-color: #111 !important;
  color: white;
  text-transform: capitalize !important;
  font-size: 1rem !important;
  padding: 0.5rem 2rem !important;
`;

const Login = () => {
  const signInWithGoogle = async () => {
    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LoginStyled>
      <ButtonStyled
        onClick={signInWithGoogle}
        startIcon={<BsGoogle color="white" />}
        variant="contained"
      >
        Sign in with Google
      </ButtonStyled>
    </LoginStyled>
  );
};

export default Login;
