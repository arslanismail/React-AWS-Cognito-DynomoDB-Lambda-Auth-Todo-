import React, { useState } from "react";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import useHandlder from "./configHandler/useHandler";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Alert,
  Link
} from "@chakra-ui/react";

const SignUp = () => {
  const { userPool } = useHandlder();

  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    comfirmpassword: "",
    error: ""
  });

  const { username, email, password, comfirmpassword, error } = state;

  const attriList = [
    new CognitoUserAttribute({ Name: "email", Value: email })
  ];

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    userPool.signUp(username, password, attriList, null, (err, data) => {
      if (err) {
        setState({ ...state, error: err?.message });
      } else {
        //alert("Please visit your email");
      }
    });
  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={4} borderWidth="1px" rounded="md">
      <Heading as="h1" textAlign="center" mb={8}>
        Sign Up
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            id="username"
            value={username}
            onChange={handleChange}
            placeholder="Username"
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={handleChange}
            placeholder="Email"
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={handleChange}
            placeholder="Password"
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            type="password"
            id="comfirmpassword"
            value={comfirmpassword}
            onChange={handleChange}
            placeholder="Confirm Password"
          />
        </FormControl>
        {error && <Alert status="error" mt={4}>{error}</Alert>}
        <Button
          mt={4}
          colorScheme="teal"
          type="submit"
          disabled={!username || !email || !password || password !== comfirmpassword}
        >
          Sign Up
        </Button>
      </form>
      <Text mt={4}>
        Already have an account? <Link href="/signin">Sign In</Link>
      </Text>
    </Box>
  );
};

export default SignUp;
