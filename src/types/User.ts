export interface User {
    id: number;
    userName : string;
    city : string;
    age : number
}

export interface FormData{
    userName : string;
    city : string;
    age : number
}


export interface UserStringOnly {
    userName : string;
    city : string;
}