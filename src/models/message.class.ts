export class Message {
    id: string;
    firstLastName: string;
    message: string;
    time: number;

    constructor(obj?: any) {
        this.id = obj && obj.id ? obj.id : '';
        this.firstLastName = obj && obj.firstLastName ? obj.firstLastName : '';
        this.message = obj && obj.message ? obj.message : '';
        this.time = obj && obj.time ? obj.time : '';
    }
}