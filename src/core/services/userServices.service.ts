import axios from 'axios';
import { apiUrl } from './helpers/api-url';
import { ApiUrlsEnum } from './helpers/api-url';
import { UserDetails } from '../models';
import { PrestataireDetails } from '../models/prestataire/prestataire-details';
import { PrestataireDTO } from '../generated/PrestataireDTO';
// handleResponse


async function getAllUsers(): Promise<UserDetails[]> {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjExLCJpYXQiOjE2ODM1NTA0MTYsImV4cCI6MTY4NDE1NTIxNn0.nqmEB8lwxzIq19NVWIta3JXgS-q1RB7zBSdU6dUPhQw";
        const res = await axios.get(`${apiUrl}/${ApiUrlsEnum.GetAllUsers}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data.map((userData: any) => UserDetails.mapToApiValue(userData));
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
}

async function getAllPrestataires(): Promise<PrestataireDTO[]> {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjExLCJpYXQiOjE2ODM1NTA0MTYsImV4cCI6MTY4NDE1NTIxNn0.nqmEB8lwxzIq19NVWIta3JXgS-q1RB7zBSdU6dUPhQw";
        const res = await axios.get(`${apiUrl}/${ApiUrlsEnum.GetAllPrestataire}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data.map((userData: any) => PrestataireDetails.mapToApiValue(userData));
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
}

export default { getAllUsers, getAllPrestataires };