export class Message {
    id: string;
    firstName: string;
    lastName: string;
    message: string;
    time: number;

    constructor(obj?: any) {
        this.id = obj && obj.id ? obj.id : '';
        this.firstName = obj && obj.firstName ? obj.firstName : '';
        this.lastName = obj && obj.lastName ? obj.lastName : '';
        this.message = obj && obj.message ? obj.message : '';
        this.time = obj && obj.time ? obj.time : '';
    }
}