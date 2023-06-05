import { SignupData } from './../models/auth/sign-up-data';
import { apiUrlMatcher, ApiUrlsEnum, post, get, apiUrl } from './helpers';
import { HttpParamsType } from '../models';
import { LoginDTO, LoginData, LoginInterface } from '../generated/LoginDto';
import { UserDTO } from '../generated/UserDto';
import { UserDetails } from '../models/user/user-details';
import { SignupDTO } from '../generated/SignupDTO';
import { AxiosResponse } from 'axios';
import RequestPerformer from './helpers/request_performer';


//User
export async function authenticate(params: HttpParamsType<LoginDTO>): Promise<UserDetails> {
  console.log("Params", params);
  const user = await post<UserDTO>(apiUrlMatcher(ApiUrlsEnum.Authenticate), params);

  return UserDetails.mapToApiValue(user);
}

export async function login(email: string, motdepasse: string): Promise<LoginInterface> {
  // use request performer
  const onSuccess = (response: AxiosResponse) => {
    LoginData.mapToApiValue(response.data);
    // Storing the token
    sessionStorage.setItem('token', response.data.token);

  }

  const onFailure = (error: any) => {
    console.error('Error fetching users:', error);
    throw new Error('Failed to login');
  }

  const requestPerformer = new RequestPerformer('post', `${apiUrl}${ApiUrlsEnum.Authenticate}`, onSuccess, onFailure);
  requestPerformer.setData({ email, motdepasse });

  return new Promise<LoginInterface>((resolve, reject) => {
    requestPerformer.performRequest();
    requestPerformer.onSuccess = (response: AxiosResponse) => {
      resolve(response.data);
    };
    requestPerformer.onFailure = (error: any) => {
      reject(error);
    };
  });
}

export async function register(params: HttpParamsType<SignupData>): Promise<SignupData> {
  console.log("Params Register", params);
  const user = await post<SignupData>(apiUrlMatcher(ApiUrlsEnum.Register), params);
  return SignupData.mapToApiValue(user);
}

export async function checkToken(): Promise<UserDetails> {
  const user = await get<UserDTO>(apiUrlMatcher(ApiUrlsEnum.CheckToken));

  // const user: UserDTO = {
  //   token:
  //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  //   id: 1,
  //   email: 'mail@gmail.com',
  //   firstName: 'ahmed',
  //   lastName: 'chebil',
  // };

  return UserDetails.mapToApiValue(user);
}

//Prestataire

export async function authenticatePrestataire(params: HttpParamsType<LoginDTO>): Promise<UserDetails> {
  console.log("Params", params);
  const user = await post<UserDTO>(apiUrlMatcher(ApiUrlsEnum.AuthenticatePrestataire), params);

  return UserDetails.mapToApiValue(user);
}

export async function registerPrestataire(params: HttpParamsType<SignupDTO>): Promise<UserDetails> {
  console.log("Params", params);
  const user = await post<UserDTO>(apiUrlMatcher(ApiUrlsEnum.RegisterPrestataire), params);

  return UserDetails.mapToApiValue(user);
}

export async function checkTokenPrestataire(): Promise<UserDetails> {
  const user = await get<UserDTO>(apiUrlMatcher(ApiUrlsEnum.CheckTokenPrestataire));

  // const user: UserDTO = {
  //   token:
  //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  //   id: 1,
  //   email: 'mail@gmail.com',
  //   firstName: 'ahmed',
  //   lastName: 'chebil',
  // };

  return UserDetails.mapToApiValue(user);
}
