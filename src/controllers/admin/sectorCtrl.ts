import { Request, Response, NextFunction } from "express"
import { createSector, deleteSectorById, getSectors, getSectorById, updateSectorById } from "../../services/sectorServ"
import { getUserById } from "../../services/userServ"




// /sectors
export const getSectorsCtrl = async (req: Request, res: Response, next: NextFunction) => {
    const sectors = await getSectors()
    const session: any = req.session
    const user = await getUserById(session.userId)
    const pathname = req.url.replace('/', '')
    res.render('pages/admin/sectors/sectors', {user, sectors, pathname})
}

// /update_sector
export const createSectorCtrl = async (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'GET')
        res.render('pages/admin/sectors/add_sector')
    else if (req.method === 'POST') {
        const { name }  = req.body
        const sector = { name }
        try {
            await createSector(sector)
            res.redirect('/sectors')
        } catch(e: any) {
            res.send(e.stack)
        }
    }
}


export const updateSectorCtrl = async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id)
    if (req.method === 'GET') {
        const sector = await getSectorById(id)
        res.render('pages/admin/sectors/update_sector', {sector})
    }
    else if (req.method === 'POST') {
        const { name }  = req.body
        const sector = { name }
        try {
            await updateSectorById(sector, id)
            res.redirect('/sectors')
        } catch(e: any) {
            res.send(e.stack)
        }
    }

}

export const deleteSectorCtrl = async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id)
    try {
        await deleteSectorById(id)
        res.redirect('/sectors')
    } catch(e: any) {
       res.send(e.stack) 
    }
}