import axios from 'axios';
import { apiUrl } from './helpers/api-url';
import { ApiUrlsEnum } from './helpers/api-url';
import { GarageDTO } from "../generated/GarageDTO";
import { GarageData } from "../models/garage/garage";

async function getAllCouponsValide(): Promise<GarageDTO[]> {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjExLCJpYXQiOjE2ODM1NTA0MTYsImV4cCI6MTY4NDE1NTIxNn0.nqmEB8lwxzIq19NVWIta3JXgS-q1RB7zBSdU6dUPhQw";
        const res = await axios.get(`${apiUrl}/${ApiUrlsEnum.getAllCouponsValide}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data.map((userData: any) => GarageData.mapToApiValue(userData));
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
}

async function getAllCouponsExpired(): Promise<GarageDTO[]> {
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjExLCJpYXQiOjE2ODM1NTA0MTYsImV4cCI6MTY4NDE1NTIxNn0.nqmEB8lwxzIq19NVWIta3JXgS-q1RB7zBSdU6dUPhQw";
      const res = await axios.get(`${apiUrl}/${ApiUrlsEnum.getAllCouponsExpired}/`, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      return res.data.map((userData: any) => GarageData.mapToApiValue(userData));
  } catch (error) {
      console.error('Error fetching users:', error);
      return [];
  }
}

async function getGarageDetails(id: number): Promise<GarageDTO | null> {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjExLCJpYXQiOjE2ODM1NTA0MTYsImV4cCI6MTY4NDE1NTIxNn0.nqmEB8lwxzIq19NVWIta3JXgS-q1RB7zBSdU6dUPhQw";
        const res = await axios.get(`${apiUrl}/${ApiUrlsEnum.GetGarage}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return GarageData.mapToApiValue(res.data);
    } catch (error) {
        console.error('Error fetching garage:', error);
        return null;
    }
}


export default { getAllGarages, getGarageDetails }
