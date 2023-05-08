import axios from 'axios';
import { apiUrl } from './helpers/api-url';
import { ApiUrlsEnum } from './helpers/api-url';
import { UserDetails } from '../models';
// handleResponse
function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            // if the response is not ok, throw an error
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        // if the response is ok, return the data
        console.log(data);
        return data;
    });
}

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

export default { getAllUsers };