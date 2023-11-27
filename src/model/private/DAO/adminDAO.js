import { PrismaClient } from "@prisma/client";
import { ConflictError, NotFoundError } from "../../../common/errors.js";

const USER_NOT_FOUND = "This user is not found";
export class AdminDAO{
    #databaseConnection
    constructor(){
        this.#databaseConnection=new PrismaClient()
    }

    getAdminByID(id){
        
    }
    
    getAdminByEmail(email){
        
    }

    createAdmin(newAdmin){

    }

    updateAdmin(id,updatedData){

    }
}