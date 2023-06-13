import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/Auth/AuthContext";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Link,
  Alert,
} from "@chakra-ui/react";

const SignIn = () => {
  const { authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [state, setState] = useState({
    username: "",
    password: "",
    error: undefined,
  });

  const { username, password, error } = state;

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticateUser(navigate, username, password)
    setState({
      ...state,
      username: "",
      password: "",
    });
  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={4} borderWidth="1px" rounded="md">
      <Heading as="h1" textAlign="center" mb={8}>
        Sign In
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
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={handleChange}
            placeholder="Password"
          />
        </FormControl>
        {error && <Alert status="error" mt={4}>{error}</Alert>}
        <Button
          mt={4}
          colorScheme="teal"
          type="submit"
          disabled={!username}
        >
          Sign In
        </Button>
      </form>
      <Text mt={4}>
        Don't have an account? <Link href="/signup">Sign Up</Link>
      </Text>
    </Box>
  );
};

export default SignIn;
