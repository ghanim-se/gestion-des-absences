import { Absence } from "@prisma/client"
import { getUserById } from "../services/userServ"
import { getModuleById } from "../services/moduleServ"
import { getSessionById } from "../services/sessionServ"
import { SessionList } from "./types"
import { getSectorById } from "../services/sectorServ"

export const getSessionListUtil = async (sessionList: Absence) => {
    const newSessionList: SessionList = {
        id: sessionList.id,
        username: (await getUserById(sessionList.userId))?.firstName ?? '' ,
        module: (await getModuleById(sessionList.moduleId))?.name ?? '' ,
        sector: (await getSectorById(sessionList.sectorId))?.name ?? '' ,
        session: (await getSessionById(sessionList.sessionId))?.session ?? '' ,
        createdAt: sessionList.createdAt
    }
    return newSessionList
}

