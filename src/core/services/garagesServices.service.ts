import axios from 'axios';
import { apiUrl } from './helpers/api-url';
import { ApiUrlsEnum } from './helpers/api-url';
import { GarageDTO } from "../generated/GarageDTO";
import { GarageData } from "../models/garage/garage";

async function getAllGarages(): Promise<GarageDTO[]> {
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjExLCJpYXQiOjE2ODM1NTA0MTYsImV4cCI6MTY4NDE1NTIxNn0.nqmEB8lwxzIq19NVWIta3JXgS-q1RB7zBSdU6dUPhQw";
      const res = await axios.get(`${apiUrl}/${ApiUrlsEnum.GetAllGarages}/`, {
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

export default { getAllGarages }
