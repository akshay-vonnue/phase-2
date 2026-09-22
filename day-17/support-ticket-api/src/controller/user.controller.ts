import { Request, Response } from "express";
import userService from "../services/user.service.js";
import { signToken } from "../lib/jwt.js";

export const signup = async (req: Request, res: Response) => {
    const { name, email, role, password } = req.body;

    if (!name || !email || !role || !password) {
        return res.status(400).json({
            success: false,
            message:'All fields are required'
        })
    }

    const result = await userService.signup(name, email, password, role);
    if (result) {
        const token = await signToken({id:result.id, userName: name, role, email });
        res.status(201).json({
            data: token
        })
    }

}

export const login = async (req: Request, res: Response) => {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        return res.status(400).json({
            success: false,
            message:'All fields are required'
        })
    }

    const result = await userService.login(email, password, role)
    
    res.status(200).json({
        data:result
    })
}

export const currentUser = async (req: Request, res: Response) => {
    const token = req.headers["authorization"]?.split(' ')[1];
    if (token) {
        const user = await userService.currentUser(token)

        if (!user) {
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