import { type Response } from "express";

export function handlenotFound(res:Response,message:string) {
    return res.status(404).json({
        message:message
    })
}

export function handleError(res: Response, message: string) {
    return res.status(400).json({
        message:message
    })
}