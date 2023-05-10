import axios from 'axios';
import { apiUrl } from './helpers/api-url';
import { ApiUrlsEnum } from './helpers/api-url';

import { CarnetData } from '../models/carnet/carnet';
import { CarnetDTO } from '../generated/CarnetDTO';

// Get all carnets
async function getAllCarnets(): Promise<CarnetDTO[]> {
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        try {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjExLCJpYXQiOjE2ODM1NTA0MTYsImV4cCI6MTY4NDE1NTIxNn0.nqmEB8lwxzIq19NVWIta3JXgS-q1RB7zBSdU6dUPhQw";
            const res = await axios.get(`${apiUrl}/${ApiUrlsEnum.GetAllCarnets}/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return res.data.map((userData: any) => CarnetData.mapToApiValue(userData));
        } catch (error) {
            console.error('Error fetching users:', error);
            return [];
        }
    
}

export default { getAllCarnets }
