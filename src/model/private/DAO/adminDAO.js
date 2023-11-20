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