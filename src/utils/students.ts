import { getSectorById } from "../services/sectorServ"
import { getSemesterById } from "../services/semesterServ"

export const getStudentUtil = async (student: any) => {
    const perfectStudent = {...student}
    
    perfectStudent.semesterId = await getSemesterById(perfectStudent.semesterId) 
    perfectStudent.sectorId = await getSectorById(perfectStudent.sectorId)
    
    return perfectStudent
}
