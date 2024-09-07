export interface iUser {
    _id?: string;
    name: string;
    gender:eGender;
    majors: iMajor;
    email: string;
    password: string;
    role: string;
    active: boolean;
    studentCode: string;
    studnetYear: number;
    accessToken?: string;
    dob:Date
}

export interface iUserReview {
    _id: string;
    name?: string;
    image?: string;
}

export interface iMajor {
    id: string;
    name: string | undefined;
}

export enum eGender {
    nam = 'Male',
    nu = 'Female',
}
