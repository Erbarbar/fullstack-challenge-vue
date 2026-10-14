import type { User, UserStats } from '../../src/types/user';

export const mockUsers: User[] = [
    {
        id: 1,
        name: 'Filipe',
        age: 33,
        gender: 'Male',
        image: 'https://dummyjson.com/icon/emilys/128',
        university: 'University of Coimbra',
        state: 'Coimbra',
        role: 'Member'
    },
    {
        id: 2,
        name: 'Jane Doe',
        age: 25,
        gender: 'Female',
        image: 'https://dummyjson.com/icon/emilys/128',
        university: 'Oxford',
        state: 'Cambridge',
        role: 'Member'
    }
];

export const mockUserStats: UserStats = {
    states: { 'Coimbra': 1, 'Cambridge': 1 },
    universities: { 'University of Coimbra': 1, 'Oxford': 1 },
    total_users: 2
};