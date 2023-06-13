import React, { createContext, useState } from "react";

import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser,
} from "amazon-cognito-identity-js";

const Pool_Data = {
  UserPoolId:process.env.REACT_APP_USER_POOL_ID,
  ClientId: process.env.REACT_APP_CLIENT_ID,
};

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(true);

  const userPool = new CognitoUserPool(Pool_Data);

  const authenticateUser = (navigate, username, password) => {
    const authenticationData = {
      Username: username,
      Password: password,
    };
    const authDetails = new AuthenticationDetails(authenticationData);
    const userData = {
      Username: username,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authDetails, {
      onSuccess: (result) => {
        const { accessToken, idToken, refreshToken } = result;
        // Update the authenticatedUser value in the context
        setAuthenticatedUser({
          username: cognitoUser.getUsername(),
          accessToken,
          idToken,
          refreshToken,
        });
        // Redirect to the home page
        navigate("/");
      },
      onFailure: (err) => {
        const { message } = err;
        if (message === "User is not confirmed.") {
          navigate("/confirm");
        }
        console.error("Authentication failed:", message);
      },
    });
  };

  const signOut = () => {
    const user = userPool.getCurrentUser();
    if (user) {
      user.signOut();
    }
    setAuthenticatedUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ authenticatedUser, authenticateUser, signOut, isConfirmed }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
