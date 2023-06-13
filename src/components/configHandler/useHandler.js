import React, { useState, useCallback, useEffect } from "react";
import { CognitoUserPool } from "amazon-cognito-identity-js";
const Pool_Data = {
  UserPoolId: process.env.REACT_APP_USER_POOL_ID,
  ClientId: process.env.REACT_APP_CLIENT_ID,
};

export default function useHandler() {
  const [state, setstate] = useState({
    loading: false,
    isAuthenticated: false
  });

  const { loading, isAuthenticated } = state;

  const userPool = new CognitoUserPool(Pool_Data);

  const getAuthenticatedUser = useCallback(() => {
    return userPool.getCurrentUser();
  }, []);


  useEffect(() => { 
    getAuthenticatedUser();
  }, [getAuthenticatedUser]);

  const signOut = () => {
    return userPool.getCurrentUser()?.signOut();
  };
  return {
    loading,
    isAuthenticated,
    userPool,
    getAuthenticatedUser,
    signOut
  };
}
