import { PrismaClient } from "@prisma/client"

export class SellerDAO{
    #databaseConnection
    constructor(){
        this.#databaseConnection=new PrismaClient()
    }

    getSellerByID(id){

    }
    
    getSellerByEmail(email){

    }

    createSeller(newSeller){

    }

    updateSeller(id,updatedData){

    }
}