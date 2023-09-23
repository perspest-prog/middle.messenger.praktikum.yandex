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

export interface State {
    error?: {
        code: number;
        reason?: string;
    }
    user: User;
    chats: Chat[];
    messages?: object[];
}

export interface Chat {
    avatar?: string;
    created_by: number;
    id: number;
    last_message?: object;
    title: string;
    unread_count: number;
}
