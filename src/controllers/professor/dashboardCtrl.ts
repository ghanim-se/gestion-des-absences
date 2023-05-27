import { Response, Request } from "express";
import { getAbsencesListByUserId, getLatestAbsencesList } from "../../services/absenceServ";
import { getUserById } from "../../services/userServ";
import { getSessionListUtil } from "../../utils/sessions";


export const professorDashboardCtrl = async (req: Request, res: Response) => {
    const pathname = req.url.split('/').at(2)
    const session: any = req.session
    const user = await getUserById(session.userId)
    const latestSessions = await getLatestAbsencesList(session.userId)
    const perfectLatestSessions = await Promise.all(latestSessions.map(sessionList => getSessionListUtil(sessionList)))
    const NofSessions = (await getAbsencesListByUserId(session.userId)).length
    res.render('pages/professor/dashboard', {latestSessions: perfectLatestSessions, pathname, user, NofSessions})
}