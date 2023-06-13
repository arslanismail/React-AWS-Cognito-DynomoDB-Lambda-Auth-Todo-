import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Auth/AuthContext";
import SigninLinks from "./SigninLinks";
import SignoutLinks from "./SignoutLinks";
import { Box, Flex, Spacer, Heading } from "@chakra-ui/react";

const Nav = () => {
  const { authenticatedUser, logout } = useContext(AuthContext);

  useEffect(() => {
    // Add any necessary side effects or actions here
    // This function will run whenever the authenticatedUser value changes
  }, [authenticatedUser]);

  const Links = authenticatedUser ? <SigninLinks /> : <SignoutLinks />;

  return (
    <Box bg="teal.500" p={4}>
      <Flex alignItems="center" justifyContent="space-between">
        <Heading as="h2" size="md" color="white">
          Logo
        </Heading>
        <Spacer />
        <Flex alignItems="center">
          {Links}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Nav;
