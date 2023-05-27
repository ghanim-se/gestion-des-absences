import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient()

// this is service to deal with the time of sessions 
export const getSessions = async () => {
    const sessions = await prisma.session.findMany()
    return sessions
}


export const getSessionById = async (id: number) => {
    const session = await prisma.session.findUnique({
        where: {id}
    })
    return session
}