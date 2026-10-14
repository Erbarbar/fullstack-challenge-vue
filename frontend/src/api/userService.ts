import { apiClient } from './client';
import type { User, UserStats } from '../types/user';

export const userService = {
    async getUsers(): Promise<User[]> {
        const response = await apiClient.get<User[]>('/users/');
        return response.data;
    },

    async getUserStats(): Promise<UserStats> {
        const response = await apiClient.get<UserStats>('/users/stats/');
        return response.data;
    }
};