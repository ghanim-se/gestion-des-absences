import { Response, Request } from "express";
import { getStudentsByAbsenceId } from "../../services/studentServ";
import { getStudentWithStatusUtil } from "../../utils/absences";
import { updateStudentStatus } from "../../services/absenceServ";

export const getAbsencesListCtrl = async (req: Request, res: Response) => {
    if (req.method === 'GET') {
        const id = Number(req.params.id)
        const absenceList = await getStudentsByAbsenceId(id)
        const students = await Promise.all(absenceList.map(e => getStudentWithStatusUtil(e)))
        res.render('pages/professor/absence/absencesList', {students})
    } else if (req.method === 'POST') {
        const { status } = req.body
        const absenceId = Number(req.params.id)
        const studentId = Number(req.body.studentId)
        
        try {
            await updateStudentStatus(absenceId, studentId, status)
        } catch (e: any) {
            res.send(`<pre>${e.stack}</pre>`)
        }
    }
}