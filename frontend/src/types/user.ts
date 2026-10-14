export interface User {
    id: number;
    name: string;
    age: number;
    gender: string;
    image: string;
    university: string;
    state: string;
    role: string;
}

export interface UserStats {
    states: Record<User['state'], number>;
    universities: Record<User['university'], number>;
    total_users: number;
}