import { Request, Response, NextFunction } from "express";
import { createModule, deleteModule, getModuleById, getModules, updateModule } from "../../services/moduleServ";
import { getModuleUtil } from "../../utils/modules";
import { getSectors } from "../../services/sectorServ";
import { getSemesters } from "../../services/semesterServ";
import { getUserById } from "../../services/userServ";


export const getModulesCtrl = async (req: Request, res: Response, next: NextFunction) => {
    const modules = await getModules()
    const session: any = req.session
    const user = await getUserById(session.userId)
    const perfectModules = await Promise.all(modules.map(async module => await getModuleUtil(module)))
    const pathname = req.url.replace('/','')
    res.render('pages/admin/modules/modules' , {user, modules: perfectModules, pathname})
}

export const createModuleCtrl = async (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'GET') {
        const sectors = await getSectors()
        const semesters = await getSemesters()
        res.render('pages/admin/modules/add_module', {sectors, semesters})
    }
    else if (req.method === 'POST') {
        const {name, sectors, semesters} = req.body
        if (!(name && semesters && sectors)) return res.redirect(`/add_module/`)

        const module = {name, sectors: [...sectors], semesters: [...semesters]}
        try {
            await createModule(module)
            res.redirect('/modules')
        } catch (e: any) {
            res.send(e.stack)
        }
    }
}


export const updateModuleCtrl = async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id)
    if (req.method === 'GET') {
        const sectors = await getSectors()
        const semesters = await getSemesters()
        const module = await getModuleById(id)
        res.render('pages/admin/modules/update_module', {module, sectors, semesters})
    }

    else if (req.method === 'POST') {
        const {name, sectors, semesters} = req.body
        if (!(name && semesters && sectors)) return res.redirect(`/update_module/${id}`)

        const module = {name, sectors: [...sectors], semesters: [...semesters]}
        try {
            await updateModule(id, module)
            res.redirect('/modules')
        } catch (e: any) {
            res.send(e.stack)
        }
    }
}

export const deleteModuleCtrl = async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id)
    try {
        await deleteModule(id)
        res.redirect('/modules')
    } catch(e: any) {
        res.send(`<pre>${e.stack}</pre>`)
    }
}