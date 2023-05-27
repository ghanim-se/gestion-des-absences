import { Request, Response, NextFunction } from "express";
import { getUserById } from "../services/userServ";



const adminAuth = async (req: Request, res: Response, next: NextFunction) => {
    // return next()
    const session: any = req.session
    if(!(session && session.userId))
        res.redirect('/')
    else {
        const userId = session.userId
        const role = (await getUserById(userId))?.role

        if(role === 'ADMIN') 
            return next()

        if(role === 'PROF') 
            res.redirect('/')
    }

}

export { adminAuth }