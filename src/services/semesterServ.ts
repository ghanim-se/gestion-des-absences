import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()

export const getSemesters = async () => {
    const semesters = await prisma.semester.findMany()
    return semesters
}

export const getSemesterById = async (id: number) => {
    const semester = await prisma.semester.findUnique({
        where: {
            id
        }
    })
    return semester
}