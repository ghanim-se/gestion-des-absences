import { Response, Request } from "express";
import { getUserByEmail, getUserById, updateUser } from "../services/userServ";

export const loginPageCtrl = async (req: Request, res: Response) => {
    const session: any = req.session
    if (req.method === 'GET') {
        if (!session.userId) return res.render('pages/login')

        const role = (await getUserById(session.userId))?.role
        if (!role) return res.redirect('/') 

        if (role === 'ADMIN') return res.redirect('/dashboard')
        else if(role === 'PROF') return res.redirect('/professor/dashboard')
    }

    else if (req.method === 'POST') {
        const { email, password } = req.body
        const user = await getUserByEmail(email)

        if (user && user.password === password) {
            session.userId = user.id
            
            const lastSeen = new Date()
            const id = user.id
            const newUser = {...user, lastSeen}

            try {
                await updateUser(id, newUser)
            } catch (e: any) {
                res.send(`<pre>${e.stack}</pre>`)
            }

            if (user.role === 'ADMIN') res.redirect('/dashboard')
            else if(user.role === 'PROF') res.redirect('/professor/dashboard')

        } else  res.redirect('/')
    }
}

export const logoutButtonCtrl = async (req: Request, res: Response) => {
    const session: any = req.session
    if (!session.userId) return res.render('pages/login')

    const lastSeen = new Date()
    const userId = session.userId
    const user = await getUserById(userId)

    if (!user) return res.render('pages/login')
    const newUser = {...user, lastSeen}

    try {
        await updateUser(userId, newUser)
        req.session.destroy(() => {})
        res.redirect('/')
    } catch (e: any) {
        res.send(`<pre>${e.stack}</pre>`)
    }
}