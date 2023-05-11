import axios from 'axios';
import { apiUrl } from './helpers/api-url';
import { ApiUrlsEnum } from './helpers/api-url';
import { UserDetails } from '../models';
import { PrestataireDetails } from '../models/prestataire/prestataire-details';
import { PrestataireDTO } from '../generated/PrestataireDTO';
import { ExpertDTO } from '../generated/ExpertDTO';
import { ExpertData } from '../models/expert/expert';
import { UserDTO } from '../generated/UserDto';
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

async function getAllDemandes(): Promise<PrestataireDTO[]> {
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

async function getAllExpert(): Promise<ExpertDTO[]> {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjExLCJpYXQiOjE2ODM1NTA0MTYsImV4cCI6MTY4NDE1NTIxNn0.nqmEB8lwxzIq19NVWIta3JXgS-q1RB7zBSdU6dUPhQw";
        const res = await axios.get(`${apiUrl}/${ApiUrlsEnum.GetAllExperts}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data.map((userData: any) => ExpertData.mapToApiValue(userData));
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
}

async function getUser(id: number): Promise<UserDetails> {
    const headers = { Accept: 'application/json' };
    try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjExLCJpYXQiOjE2ODM1NTA0MTYsImV4cCI6MTY4NDE1NTIxNn0.nqmEB8lwxzIq19NVWIta3JXgS-q1RB7zBSdU6dUPhQw";
        const res = await axios.get(`${apiUrl}/${ApiUrlsEnum.GetUser}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                ...headers,
            },
        });
        return UserDetails.mapToApiValue(res.data);
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
}

async function GetPrestataire(id: number): Promise<PrestataireDTO> {
    const headers = { Accept: 'application/json' };
    try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjExLCJpYXQiOjE2ODM1NTA0MTYsImV4cCI6MTY4NDE1NTIxNn0.nqmEB8lwxzIq19NVWIta3JXgS-q1RB7zBSdU6dUPhQw";
        const res = await axios.get(`${apiUrl}/${ApiUrlsEnum.GetPrestataire}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                ...headers,
            },
        });
        return PrestataireDetails.mapToApiValue(res.data);
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
}

async function getExpert(id: number): Promise<ExpertDTO> {
    const headers = { Accept: 'application/json' };
    try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjExLCJpYXQiOjE2ODM1NTA0MTYsImV4cCI6MTY4NDE1NTIxNn0.nqmEB8lwxzIq19NVWIta3JXgS-q1RB7zBSdU6dUPhQw";
        const res = await axios.get(`${apiUrl}/${ApiUrlsEnum.GetExpert}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                ...headers,
            },
        });
        return ExpertData.mapToApiValue(res.data);
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
}

async function getDemande(id: number): Promise<ExpertDTO> {
    const headers = { Accept: 'application/json' };
    try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjExLCJpYXQiOjE2ODM1NTA0MTYsImV4cCI6MTY4NDE1NTIxNn0.nqmEB8lwxzIq19NVWIta3JXgS-q1RB7zBSdU6dUPhQw";
        const res = await axios.get(`${apiUrl}/${ApiUrlsEnum.GetPrestataire}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                ...headers,
            },
        });
        return ExpertData.mapToApiValue(res.data);
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
}


export default { getAllUsers, getAllPrestataires, getAllExpert, getUser, GetPrestataire, getExpert, getAllDemandes, getDemande };