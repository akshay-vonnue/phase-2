import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config()
console.log(process.env.JWT_SECRET)

export const signToken = async (payload: { userName: String, role: 'ADMIN' | 'AGENT' | 'USER' }) => {
    return jwt.sign(payload, process.env.JWT_SECRET as jwt.Secret, {
        expiresIn: process.env.JWT_EXPIRES_IN as unknown as NonNullable<
            jwt.SignOptions['expiresIn']
        >
    })    
}

export const verifyToken = async (token: string) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    return {
        userName: decoded.userName,
        role: decoded.role
    }
}