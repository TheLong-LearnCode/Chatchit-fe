export default interface IUserJoin {
    _id: string;
    name: string;
    role: string;
    image?: string;
    isNew: boolean;
    isLeaving: boolean;
}

export interface IUser {
    _id: string;
    name: string;
    email: string;
    role: string;
    image: string;
    isActive: boolean;
    accountType: string;
}