import { Request, Response } from "express";
import { getSectors } from "../../services/sectorServ";
import { getSemesters } from "../../services/semesterServ";
import { getModules } from "../../services/moduleServ";
import { getSessions } from "../../services/sessionServ";
import { createAbsenceList } from "../../services/absenceServ";
import { getStudentsBySemesterAndSector } from "../../services/studentServ";



export const manaulPage = async (req: Request, res: Response) => {
    if (req.method === 'GET') {
        const semesters = await getSemesters()
        const sectors = await getSectors()
        const modules = await getModules()
        const sessions = await getSessions()
        res.render('pages/professor/absence/manual', {semesters, sectors, modules, sessions})

    } else if (req.method === 'POST') {
        const semesterId = Number(req.body.semesterId)
        const sectorId = Number(req.body.sectorId)
        const moduleId = Number(req.body.moduleId)
        const sessionId = Number(req.body.sessionId)

        const session: any = req.session
        const students = await getStudentsBySemesterAndSector(semesterId, sectorId)
        console.log(semesterId, sectorId, moduleId, sessionId)
        console.log(students)

        try {
            await createAbsenceList(session.userId, moduleId, sessionId, sectorId, students)
            res.redirect('/professor/sessions')
        } catch (e: any) {
            res.send(`<pre>${e.stack}</pre>`)
        }
    }
}