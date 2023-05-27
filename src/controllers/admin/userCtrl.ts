import { Request, Response } from "express";
import { createUser, deleteUser, getUserById, getUsers, updateUser } from "../../services/userServ";
import { User } from "@prisma/client";


export const getUsersCtrl = async (req: Request, res: Response) => {
    const users = await getUsers()
    const session: any = req.session
    const user = await getUserById(session.userId)
    const pathname = req.url.replace('/', '')
    res.render('pages/admin/users/users', {user, users, pathname})
}

export const createUserCtrl = async (req: Request, res: Response) => {
    if (req.method === 'GET') {
        res.render('pages/admin/users/add_user')
    } else if (req.method === 'POST') {
        const registrationDate = new Date()
        const user: User = {registrationDate, ...req.body}

        try {
            await createUser(user)
            res.redirect('/users')
        } catch(e: any) {
            res.send(`<pre>${e.stack}</pre>`)
        }
        
    }
}

export const updateUserCtrl = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const user = await getUserById(id)
    if (req.method === 'GET') {
        res.render('pages/admin/users/update_user', {user})
    } else if (req.method === 'POST') {
        const registrationDate = user?.registrationDate
        const newUser: User = {registrationDate, ...req.body}
        console.log(newUser)

        try {
            await updateUser(id, newUser)
            res.redirect('/users')
        } catch(e: any) {
            res.send(`<pre>${e.stack}</pre>`)
        }
    }
}

export const deleteUserCtrl = async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    try {
        await deleteUser(id)
        res.redirect('/users')
    } catch(e: any) {
        res.send(`<pre>${e.stack}</pre>`)
    }
}