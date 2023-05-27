import { PrismaClient } from "@prisma/client";
import Module from "module";
import { factoryFunction } from "../utils/modules";

const prisma = new PrismaClient()


export const getModules = async () => {
    const modules = prisma.module.findMany({
        include: {
            semesters: {
                select: {
                    semesterId: true
                }
            },
            sectors: {
                select: {
                    sectorId: true
                }
            }
        }
    })
    return modules
}

export const createModule = async (newModule: any) => {
    const module = await prisma.module.create({
        data: {...factoryFunction(newModule)}
    })
}

export const updateModule = async (id: number, newModule: any) => {
    
    const deleteOldReletedRecords = prisma.module.update({
        where: { id },
        data: {
            sectors: {
                deleteMany: {}
            },
            semesters: {
                deleteMany: {}
            }
        }
    })

    const addNewRecords = prisma.module.update({
        where: { id },
        data: {...factoryFunction(newModule)}
    })

    await prisma.$transaction([deleteOldReletedRecords, addNewRecords])
}

export const getModuleById = async (id: number) => {
    const module = await prisma.module.findUnique({
        where: {id},
        include: {
            semesters: {
                select: {
                    semesterId: true
                }
            }, 
            sectors: {
                select: {
                    sectorId: true
                }
            }, 
        }
    })
    return module
}

export const deleteModule = async (id: number) => {

    const deleteReletedRecords = prisma.module.update({
        data: {
            semesters: {
                deleteMany: {}
            },
            sectors: {
                deleteMany: {}
            }
        },
        where: {
            id
        }
    })
    
    const deleteModule = prisma.module.delete({
        where: {id}
    })

    return await prisma.$transaction([deleteReletedRecords, deleteModule])
}