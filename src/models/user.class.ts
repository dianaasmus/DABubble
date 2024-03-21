export class User {
    id?: string;
    firstLastName: string;
    email?: string;
    password?: string;
    profileImg?: string;

    constructor(obj?: any) {
        this.id = obj && obj.id ? obj.id : '';
        this.firstLastName = obj && obj.firstLastName ? obj.firstLastName : '';
        this.email = obj && obj.email ? obj.email : '';
        this.password = obj && obj.password ? obj.password : '';
        this.profileImg = obj && obj.profileImg ? obj.profileImg : '';
    }
}