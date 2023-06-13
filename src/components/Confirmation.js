import React, { useState } from "react";
import { CognitoUserPool, CognitoUser } from "amazon-cognito-identity-js";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Link,
} from "@chakra-ui/react";


const Confirmation = () => {
  const history = useNavigate();
  const poolData = {
    UserPoolId: process.env.REACT_APP_USER_POOL_ID,
    ClientId: process.env.REACT_APP_CLIENT_ID,
  };

  const [state, setState] = useState({
    username: "",
    verification: ""
  });

  const { username, verification } = state;

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userPool = new CognitoUserPool(poolData);
    const userData = {
      Username: username,
      Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(verification, true, (err, result) => {
      if (err) {
        console.log({ err });
      } else {
        //
      }
    });
  };

  const handleResendCode = () => {
    const userPool = new CognitoUserPool(poolData);
    const userData = {
      Username: username,
      Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.resendConfirmationCode((err, result) => {
      if (err) {
        console.log({ err });
      } else {
        // Confirmation code resent successfully
      }
    });
  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={4} borderWidth="1px" rounded="md">
      <Heading as="h1" textAlign="center" mb={8}>
        Confirmation Test
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
          <FormLabel>Verification Code</FormLabel>
          <Input
            type="text"
            id="verification"
            value={verification}
            onChange={handleChange}
            placeholder="Verification Code"
          />
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit">
          Submit
        </Button>
        <Link mt={2} color="blue.500" onClick={handleResendCode}>
          Resend Confirmation Code
        </Link>
      </form>
    </Box>
  );
};

export default Confirmation;
