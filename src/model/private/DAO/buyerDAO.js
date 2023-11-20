const { PrismaClient } = require("@prisma/client")

export class BuyerDAO{
    #databaseConnection
    constructor(){
        this.#databaseConnection=new PrismaClient()
    }

    getBuyerByID(id){

    }
    
    getBuyerByEmail(email){

    }

    createBuyer(newBuyer){
        
    }

    updateBuyer(id,updatedData){

    }

}