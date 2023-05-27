import { Response, Request } from "express";
import { getabsenceLists } from "../../services/absenceServ";
import { getSessionListUtil } from "../../utils/sessions";
import { getUserById } from "../../services/userServ";


export const getabsenceListsCtrl = async (req: Request, res: Response) => {
    const pathname = req.url.replace('/', '') 
    const session: any = req.session
    const user = await getUserById(session.userId)
    const absenceLists = await getabsenceLists()
    const perfectAbsenceLists = await Promise.all(absenceLists.map((absenceList: any) => getSessionListUtil(absenceList)))
    res.render('pages/admin/absence/sessionsList', {pathname, user, absenceLists: perfectAbsenceLists})
}