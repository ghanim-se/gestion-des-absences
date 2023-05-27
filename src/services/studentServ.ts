import { PrismaClient, Student } from "@prisma/client"
import { StudentWithoutId } from "../utils/types"
import exp from "constants"


const prisma = new PrismaClient()
export const getStudents = async () => {
    const students = await prisma.student.findMany()
    return students
}

export const createStudent = async (user: StudentWithoutId) => {
    const student = await prisma.student.create({
        data: {...user}
    }) 
}

export const getStudentById = async (id: number) => {
    const student = await prisma.student.findUnique({
        where: {id}
    })
    return student
}

export const updateStudentById = async (newStudent: StudentWithoutId, id: number) => {
    const student = await prisma.student.update({
        where: {id},
        data: {...newStudent}
    })
}

export const deleteStudentById = async (id: number) => {
    const student = await prisma.student.delete({
        where: {id},
    })
}

export const getStudentsBySemesterAndSector = async (semesterId: number, sectorId: number) => {
    const students = await prisma.student.findMany({
        where: {semesterId, sectorId}
    })
    return students
}

export const getStudentsByAbsenceId = async (absenceId: number) => {
    const students = await prisma.absence_Student.findMany({
        where: {absenceId}
    })
    return students
}