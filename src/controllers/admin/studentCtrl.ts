import { Request, Response, NextFunction } from "express";
import { createStudent, deleteStudentById, getStudentById, getStudents, updateStudentById } from "../../services/studentServ";
import { getSectors } from "../../services/sectorServ";
import { getSemesters } from "../../services/semesterServ";
import { getStudentUtil } from "../../utils/students";
import { getUserById } from "../../services/userServ";


// /students
export const getStudentsCtrl = async (req: Request, res: Response, next: NextFunction) => {
    const students = await getStudents()
    const session: any = req.session
    const user = await getUserById(session.userId)
    const perfectStudents = await Promise.all(students.map(async student => await getStudentUtil(student)))
    const pathname = req.url.replace('/', '')
    res.render('pages/admin/students/students', {user, students: perfectStudents, pathname})
}

// /add_Students
export const createStudentCtrl = async (req: Request, res: Response, next: NextFunction) => {

    if(req.method === 'GET') {
        const sectors = await getSectors()
        const semesters = await getSemesters()
        res.render('pages/admin/students/add_student', {sectors, semesters})
    }

    else if(req.method === 'POST') {
        let {apogeeCode, birthDate, semesterId, sectorId} = req.body
        console.log(req.body)

        if(!apogeeCode.trim()) {
            res.redirect('/add_student')
            return
        }

        apogeeCode = Number(apogeeCode) 
        birthDate = new Date(birthDate)
        sectorId = Number(sectorId) 
        semesterId = Number(semesterId) 
        const user = {...req.body, apogeeCode, birthDate, sectorId, semesterId}
        await createStudent(user)
        res.redirect('/students')
    }
}

// /update_Student
export const updateStudentCtrl = async (req: Request, res: Response, next: NextFunction) => {
    if(req.method === 'GET') {
        const id = Number(req.params.id)
        const student = await getStudentById(id)
        const birthDate = student?.birthDate.toISOString().split('T').at(0)
        const sectors = await getSectors()
        const semesters = await getSemesters()
        res.render('pages/admin/students/update_student', {student, birthDate, sectors, semesters})
    }
    else if(req.method === 'POST') {
        console.log(req.body)



        const id = Number(req.params.id)
        let {apogeeCode, birthDate, semesterId, sectorId} = req.body

        if(!apogeeCode.trim()) {
            res.redirect(`/update_student/${id}`)
            return
        }

        apogeeCode = Number(apogeeCode) 
        birthDate = new Date(birthDate)
        sectorId = Number(sectorId) 
        semesterId = Number(semesterId) 
        
        const user = {...req.body, apogeeCode, birthDate, sectorId, semesterId}
        try {
            await updateStudentById(user, id)
            res.redirect('/students')
        } catch(e: any) {
            res.send(e.stack)
        }
    }
}

// /delete_Student
export const deleteStudentCtrl = async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id)
    try {
        await deleteStudentById(id)
        res.redirect('/students')
    } catch {
        res.send('deleteStudentCtrl')
    }
}