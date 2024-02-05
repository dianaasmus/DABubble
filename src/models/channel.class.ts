export class Channel {
    id: string;
    name: string;
    users: string;

    constructor(obj?: any) {
        this.id = obj && obj.id ? obj.id : '';
        this.name = obj && obj.name ? obj.name : '';
        this.users = obj && obj.users ? obj.users : '';
    }
}