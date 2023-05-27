import { PrismaClient } from "@prisma/client";
import { SectorWithoutId } from "../utils/types";


const prisma = new PrismaClient()

export const getSectors = async () => {
    const sectors = await prisma.sector.findMany()
    return sectors
}

export const createSector = async (sector: SectorWithoutId) => {
    const sectors = await prisma.sector.create({
        data: {...sector}
    })
}

export const getSectorById = async (id: number) => {
    const sector = await prisma.sector.findUnique({
        where: {id}
    })
    return sector
}

export const updateSectorById = async (newSector: SectorWithoutId, id: number) => {
    const sector = await prisma.sector.update({
        where: {id},
        data: {...newSector}
    })
    return sector
}

export const deleteSectorById = async (id: number) => {
    const sector = await prisma.sector.delete({
        where: {id},
    })
}