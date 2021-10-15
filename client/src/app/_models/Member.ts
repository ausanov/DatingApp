import { Photo } from "./Photo";

export interface Member {
    id: number;
    userName: string;
    photoUrl: string;
    age: number;
    knownAs: string;
    dateCreated: Date;
    lastActiveDate: Date;
    gender: string;
    introduction: string;
    lookingFor: string;
    interests: string;
    country: string;
    city: string;
    photos: Photo[];
}
