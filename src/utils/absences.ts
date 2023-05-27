import { Absence_Student } from "@prisma/client"
import { getStudentById } from "../services/studentServ"

export const getStudentWithStatusUtil = async (absenceList: Absence_Student) => {
    const student = (await getStudentById(absenceList.studentId))
    const newAbsenceList = {
        ...student,
        status: absenceList.status 
    }
    return newAbsenceList
}

