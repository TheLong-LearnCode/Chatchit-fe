export default interface IUserJoin {
    _id: string;
    name: string;
    role: string;
    image?: string;
    isNew: boolean;
    isLeaving: boolean;
}