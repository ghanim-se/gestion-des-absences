import { PrismaClient, Student } from "@prisma/client";


const prisma = new PrismaClient()

export const getabsenceLists = async () => {
    const absenceLists = await prisma.absence.findMany()
    return absenceLists
}
export const createAbsenceList = async (userId: number, moduleId: number, sessionId: number, sectorId: number, students: Student[]) => {
    const absence = await prisma.absence.create({
        data: {
            userId,
            sessionId,
            sectorId,
            moduleId,
            createdAt: new Date()
        }
    })

    const promises = students.map(student => {
            return prisma.absence_Student.create({
            data: {
                absenceId: absence.id,
                studentId: student.id,
                status: 'present'
            }
            })
    })

    const absencesList = await Promise.all(promises)
    return absencesList
}

export const getAbsenceListById = async (id: number) => {
    const absence = await prisma.absence.findUnique({
        where: {id}
    })
    return absence
}

export const getAbsencesListByUserId = async (userId: number) => {
    const absences = await prisma.absence.findMany({
        where: {userId}
    })
    return absences
}

export const updateStudentStatus = async (absenceId: number, studentId: number, status: string) => {
    const result = await prisma.absence_Student.update({
        where: { 
            absenceId_studentId: {
                absenceId,
                studentId
            }
        },
        data: {status}
    })
}


export const getLatestAbsencesList = async (userId: number) => {
    const absences = await prisma.absence.findMany({
        where: {userId},
        orderBy: {
            createdAt: 'desc'
        },
        take: 4
    })
    return absences
}

export const deleteAbsenceListById = async (id: number) => {
    const deleteReletedRecords = prisma.absence.update({
        data: {
            students: {
                deleteMany: {}
            }
        },
        where: {
            id,
        }
    })
    
    const absence = prisma.absence.delete({
        where: { id } 
    })

    return await prisma.$transaction([deleteReletedRecords, absence])
}