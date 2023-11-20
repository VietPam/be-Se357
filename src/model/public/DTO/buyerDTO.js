export class Buyer{
    constructor(id ,email, password,name,birthday,isActive=true,shoppingCart=[],orders=[],addresses=[],reviews=[])
    {
        this.id=id;
        this.email=email;
        this.password=password;
        this.name=name;
        this.birthday=birthday;
        this.isActive=isActive;
        this.shoppingCart=shoppingCart;
        this.orders=orders;
        this.addresses=addresses;
        this.reviews=reviews;
    }
}