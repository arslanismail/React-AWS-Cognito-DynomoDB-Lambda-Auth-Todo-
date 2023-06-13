import React from 'react';
import { Link } from "react-router-dom";
import { HStack } from "@chakra-ui/react";

export default function SignoutLinks() {
  return (
    <HStack spacing={4}>
      <Link to="/signin">Sign In</Link>
      <Link to="/signup">Sign Up</Link>
    </HStack>
  );
}
