import { Response } from "express";

const standardResponse = (res: Response, statusCode: number, message: string, data: any = null) => {
    console.log(`Response: ${statusCode} - ${message}`, data ? data : '');
    res.status(statusCode).json({
        message: message,
        data: data
    }).send();
}

export default standardResponse;