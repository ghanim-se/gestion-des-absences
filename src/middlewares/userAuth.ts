import { Request, Response, NextFunction } from "express";
import { getUserById } from "../services/userServ";



const userAuth = async (req: Request, res: Response, next: NextFunction) => {
    // return next()
    const session: any = req.session
    if(!(session && session.userId)) 
        res.redirect('/')
    else {
        const userId = session.userId
        const role = (await getUserById(userId))?.role

        if(role === 'PROF') 
            return next()

        if(role === 'ADMIN') 
            res.redirect('/')
    }
}

export { userAuth }