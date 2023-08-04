import { apiUrlMatcher, ApiUrlsEnum, post, get } from './helpers';
import { HttpParamsType } from '../models';
import { LoginDTO } from '../generated/LoginDto';
import { UserDTO } from '../generated/UserDto';
import { UserDetails } from '../models/user/user-details';
import { SignupDTO } from '@core/generated/SignupDTO';
import { ServiceDTO } from '@core/generated/ServiceDTO';
import { ServiceData } from '@core/models/service/service';

// export async function authenticate(params: HttpParamsType<LoginDTO>): Promise<UserDetails> {
//   console.log("Params", params);
//   const user = await post<UserDTO>(apiUrlMatcher(ApiUrlsEnum.Authenticate), params);

//   return UserDetails.mapToApiValue(user);
// }

// export async function register(params: HttpParamsType<ServiceDTO>): Promise<ServiceData> {
//   console.log("Params", params);
//   const user = await post<ServiceDTO>(apiUrlMatcher(ApiUrlsEnum.AddService), params);

//   return ServiceData.mapToApiValue(user);
// }

// export async function checkToken(): Promise<UserDetails> {
//   const user = await get<UserDTO>(apiUrlMatcher(ApiUrlsEnum.CheckToken));

//   // const user: UserDTO = {
//   //   token:
//   //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
//   //   id: 1,
//   //   email: 'mail@gmail.com',
//   //   firstName: 'ahmed',
//   //   lastName: 'chebil',
//   // };

//   return UserDetails.mapToApiValue(user);
// }
