import { useEffect, useState } from "react";

export function useJwt() {
  const [istokenExpired, setIsTokenExpired] = useState(false);
  const token = localStorage.getItem("jwt_token");
  console.log("inside useJWt token:", token);
  console.log(`${import.meta.env.VITE_API_BASE_URL}/user/me`);

  useEffect(() => {
    const verifyToken = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/user/me`,
        {
          method: "GET",
          headers: {
            Authorization: token as string,
          },
        },
      );

      console.log(response);

      if (response.status === 401) {
        console.log("setting isTokenExpired to true");
        setIsTokenExpired(true);
      } else {
        setIsTokenExpired(false);
      }
    };

    verifyToken();
  }, [token]);

  console.log(istokenExpired);

  return { istokenExpired };
}
