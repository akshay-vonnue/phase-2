import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function signToken(payload: { userId: string }) {
  const token = jwt.sign(payload, process.env.JWT_SECRET as jwt.Secret, {
    expiresIn: "1hr",
  });
  console.log(token);
  return token;
}

export function verifyToken(token: string) {
  const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
  return decoded.userId
}

// console.log(verifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbXVtOWZ3dTIwMDAwd3JydjE2cXk3M3ZwIiwiaWF0IjoxNzkwNjcyOTYxLCJleHAiOjE3OTA2NzY1NjF9.y7PLjlHjvKaVBbQecVtNsmAshxAhkH0aI5t3b6WAKbk'))