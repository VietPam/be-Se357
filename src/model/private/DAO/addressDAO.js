export class AddressDAO{
    #databaseConnection
    constructor(){
        this.#databaseConnection=new PrismaClient()
    }

    getAddressByID(id){
        
    }

    createAddress(newAddress){

    }

    updateAddress(id,updatedData){

    }
}