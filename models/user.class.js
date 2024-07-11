import { ROLES } from './roles.enum';
export class User {
    cui='';
    nit='';
    name='';
    lastname='';
    phone='';
    address='';
    gender='';
    birthday='';
    stateCivil='';
    profession='';
    email='';
    password='';
    confirmPassword='';
    roles = ROLES.USER;

    constructor(cui,nit,name,lastname,phone,address,gender,birthday,stateCivil,profession,email,password,confirmPassword,roles){
        this.cui=cui;
        this.nit=nit;
        this.name=name;
        this.lastname=lastname;
        this.phone=phone;
        this.address=address;
        this.gender=gender;
        this.birthday=birthday;
        this.stateCivil=stateCivil;
        this.profession=profession;
        this.email=email;
        this.password=password;
        this.confirmPassword=confirmPassword;
        this.roles=roles;
    }

}