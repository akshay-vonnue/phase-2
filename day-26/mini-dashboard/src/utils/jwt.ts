import dotenv from "dotenv";
dotenv.config();

export async function verifyToken(token: string) {
  const response = await fetch(`${process.env.VITE_API_BASE_URL}/user/me`, {
    method: "GET",
    headers: {
      authorisation: token,
    },
  });

  if (response.status === 401) {
    return false;
  }
  return true;
}
