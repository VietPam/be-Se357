export class Admin {
  constructor(id,email,password,name,birthday,isActive=true)
  {
    this.id=id;
    this.email=email;
    this.password=password;
    this.name=name;
    this.birthday=birthday;
    this.isActive=isActive
  }
}
