import { createContext, useContext } from "react";

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

export const AuthContext = createContext<User | undefined>(undefined);

export function useAuthContext() {
    const user = useContext(AuthContext);
    console.log(user)
    if (user === undefined) {
        throw new Error("useAuthContext can't be used with Authcontext");
    }
    return user
}