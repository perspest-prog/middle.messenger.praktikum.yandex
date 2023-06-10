export interface User {
    id: number;
    first_name: string;
    second_name: string;
    phone: string;
    email: string;
    login: string;
    avatar?: string;
    display_name?: string;
}

export interface SignUpData {
    first_name: string;
    second_name: string;
    phone: string;
    email: string;
    login: string;
    password: string;
}

export interface SignInData {
    login: string;
    password: string;
}

