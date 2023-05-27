import { PrismaClient, User } from "@prisma/client";


const prisma = new PrismaClient()


export const getUsers = async () => {
    const users = await prisma.user.findMany()
    return users
}

export const createUser = async (newUser: User) => {
    const user = await prisma.user.create({
        data: {...newUser}
    })
    return user
}

export const getUserById = async (id: number) => {
    const user = await prisma.user.findUnique({
        where: {id}
    })
    return user
}

export const getUserByEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: {email}
    })
    return user
}

export const updateUser = async (id: number, newUser: User) => {
    const user = await prisma.user.update({
        where: {id},
        data: {...newUser}
    })
    return user
}

export const deleteUser = async (id: number) => {
    const user = await prisma.user.delete({
        where: {id},
    })
    return user
}

export const getLatestUsers = async (id: number) => {
    const latestUsers = await prisma.user.findMany({
        where: {
            id: {
                not: id
            }
        },
        orderBy: {
            lastSeen: 'desc'
        },
        take: 4
    })
    return latestUsers
}