export class Channel {
    id: string;
    name: string;
    member: string;

    constructor(obj?: any) {
        this.id = obj && obj.id ? obj.id : '';
        this.name = obj && obj.name ? obj.name : '';
        this.member = obj && obj.member ? obj.member : '';
    }
}