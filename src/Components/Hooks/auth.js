import React, { createContext, useContext } from "react";
import { useState } from "react";
const Authcontext = createContext();
const UserContext = createContext();
const UserUpdateContext = createContext();

export function useAuthContext() {
  return useContext(Authcontext);
}
export function useUserContext() {
  return useContext(UserContext);
}
export function useUserUpdateContext() {
  return useContext(UserUpdateContext);
}

export const UseAuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);

  function updateUser(user1) {
    console.log(user1);
    setUser(user1);
    setAuth((authy) => !authy);
  }

  return (
    <Authcontext.Provider value={auth}>
      <UserContext.Provider value={user}>
        <UserUpdateContext.Provider value={updateUser}>
          {children}
        </UserUpdateContext.Provider>
      </UserContext.Provider>
    </Authcontext.Provider>
  );
};
