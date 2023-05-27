import { Sector, Student } from "@prisma/client";
import { Session } from "express-session";

export type StudentWithoutId = Omit<Student, 'id'>
export type SectorWithoutId = Omit<Sector, 'id'>


export interface SessionList {
    id: number,
    username: string,
    module: string,
    sector: string,
    session: string,
    createdAt: Date
}

export interface AbsenceList {
    student: Student | undefined,
    status: string
}

export type StudentWithStatus = {
    id: number,
    firstName: string,
    lastName: string,
    apogeeCode: number,
    birthDate: Date,
    semesterId: number
    sectorId: number
    status: string
}


export interface SessionWithUserId extends Session {
    userId: number
}