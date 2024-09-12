import { User } from "./user.interface";

export interface Message {
    id: String;
    userId: string;
    message: string;
    time: number;
}