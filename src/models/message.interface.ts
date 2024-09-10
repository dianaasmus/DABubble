import { User } from "./user.interface";

export interface Message {
    id: String;
    user: User;
    message: string;
    time: number;
}