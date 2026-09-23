import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../lib/jwt";
import jwt from "jsonwebtoken";

const { TokenExpiredError } = jwt;

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1]
    if (!token) {
        return res.status(401).json({
            success: false,
            message:'Unauthorised access'
        })
    }

    try {
        const decoded = await verifyToken(token as string);
        return next()
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            return res.status(401).json({
                success: false,
                message:'Unauthorised access:Token expired'
            })
        }

        return res.status(401).json({
            success: false,
            message:'Unauthorised access:Invalid token'
        })
    }
}