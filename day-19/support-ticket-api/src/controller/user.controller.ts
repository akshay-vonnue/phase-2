import { Request, Response } from "express";
import userService from "../services/user.service.js";
import { signToken } from "../lib/jwt.js";
import { logger } from "../lib/logger.js";

    
export const signup = async (req: Request, res: Response) => {
    logger.info('handling signup request')
    const { name, email, role, password } = req.body;

    if (!name || !email || !role || !password) {
        logger.error('All fields are required')
        return res.status(400).json({
            success: false,
            message:'All fields are required'
        })
    }

    const result = await userService.signup(name, email, password, role);
    if (result instanceof Error) {
        logger.error('email already in use')
        // console.log('error in email already in use')
        return res.status(400).json({
            success: false,
            message:"email already in use."
        })
    }
    if (result) {
        logger.info('signup: success')
        const token = await signToken({id:result.id, userName: name, role, email });
        res.status(201).json({
            data: token
        })
    }

}

export const login = async (req: Request, res: Response) => {
    logger.info('handling login request')
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        logger.error(`All fields are required`)
        return res.status(400).json({
            success: false,
            message:'All fields are required'
        })
    }

    const result = await userService.login(email, password, role)

    if (result instanceof Error) {
        logger.error('login: '+result.message)
        return res.status(400).json({
            success: false,
            message:result.message
        })
    }
    
    logger.info(`login:success`)
    res.status(200).json({
        data:result
    })
}

export const currentUser = async (req: Request, res: Response) => {
    logger.info('handling current user')
    const token = req.headers["authorization"]?.split(' ')[1];
    if (token) {
        const user = await userService.currentUser(token)

        if (!user) {
            logger.error(`currentUser: user not found`)
            return res.status(400).json({
                success: false,
                message:'User not found'
            })
        }

        const { password, ...safeUser } = user;
        void password;

        return res.status(200).json({
            data: safeUser
        })
    }
}