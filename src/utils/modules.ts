import { getSectorById } from "../services/sectorServ";
import { getSemesterById } from "../services/semesterServ";


export const getModuleUtil = async (module: any) => {
    const perfectModule = {...module}

    perfectModule.semesters = await Promise.all(
                            module.semesters.map((semester: any) => getSemesterById(semester.semesterId))) 
    perfectModule.sectors = await Promise.all(
                        module.sectors.map((sector: any) =>  getSectorById(sector.sectorId)))

    return perfectModule
}


export function factoryFunction(newModule: any) {
    
    const data =  {
        name: newModule.name,
        sectors: {
            create: [...sectorFactory(newModule.sectors)]
        },
        semesters: {
            create: [...semesterFactory(newModule.semesters)]
        }
    }
    return data
}

export function semesterFactory(semesters: any[]) {
    return semesters.map(id =>  {
        return {
            semester: {
                connect: {
                    id: parseInt(id) 
                }
            }
        }
    })
}
export function sectorFactory(sectors: any[]) {
    return sectors.map(id =>  {
        return {
            sector: {
                connect: {
                    id: parseInt(id) 
                }
            }
        }
    })
}