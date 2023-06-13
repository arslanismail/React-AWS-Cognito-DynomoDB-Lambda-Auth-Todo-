import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext';
import { HStack, Button } from "@chakra-ui/react";

export default function SigninLinks() {
  const { authenticatedUser, signOut } = useContext(AuthContext);

  return (
    <HStack spacing={4}>
      <Link to="/">Home</Link>
      <Link to="/secondhome">2nd Home</Link>
      <Button colorScheme="pink" onClick={signOut}>Sign Out</Button>
      <Link to="/" className="btn btn-floating pink lighten-1">NN</Link>
    </HStack>
  );
}
