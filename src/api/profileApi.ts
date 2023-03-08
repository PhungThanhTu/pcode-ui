import { AxiosResponse } from 'axios';
import { UserProfile } from '../types/auth.type';
import protectedApi from './protectedApi';

const profileApi = {

    getProfile: async () => {
        const result: AxiosResponse<UserProfile> = await protectedApi.get('/profile');
        return result;
    },
    updateProfile: async (body: any) => {
        const result: any = await protectedApi.put('/profile', body);
        return result;
    }
};

export default profileApi;