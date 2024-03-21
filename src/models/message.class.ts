import { User } from "./user.class";

export class Message {
    id: String;
    user!: User;
    message: string;
    time: number;

    constructor(obj?: any) {
        this.id = obj && obj.id ? obj.id : '';
        this.user = obj && obj.user ? obj.user : '';
        this.message = obj && obj.message ? obj.message : '';
        this.time = obj && obj.time ? obj.time : '';
    }
}