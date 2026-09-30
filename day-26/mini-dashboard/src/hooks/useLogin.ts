import { useState } from "react";
import { customFetch } from "../utils/api";

export function useLogin() {
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useState("");

  async function login(email: string, password: string) {
    const result = await customFetch("/user/login", "POST", {
      email,
      password,
    });
    if (!result.success) {
      setErrorMessage(result.message);
      return result;
    }

    setToken(result.token);

    localStorage.setItem("jwt_token", result.token);
    localStorage.setItem("user", JSON.stringify(result.user));

    return result;
  }

  console.log(token);

  return {
    login,
    errorMessage,
    token,
  };
}
