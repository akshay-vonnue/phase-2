import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config()
console.log(process.env.JWT_SECRET)

export const signToken = async (payload: {id:number, userName: String, email: string, role: 'ADMIN' | 'AGENT' | 'USER' }) => {
    return jwt.sign(payload, process.env.JWT_SECRET as jwt.Secret, {
        expiresIn: process.env.JWT_EXPIRES_IN as unknown as NonNullable<
            jwt.SignOptions['expiresIn']
        >
    })    
}

export const verifyToken = async (token: string) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    return {
        id: decoded.id,
        userName: decoded.userName,
        role: decoded.role,
        email:decoded.email
    }
}

// console.log(await verifyToken(`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlck5hbWUiOiJ1c2VyMyIsInJvbGUiOiJVU0VSIiwiZW1haWwiOiJ1c2VyM0BnbWFpbC5jb20iLCJpYXQiOjE3OTAwNTkwMzEsImV4cCI6MTc5MDA2MjYzMX0.eKtcK2wXywMxoQYYJ5sVbXAdxgJ617YN86jjNlaQiBs`))