import { SignupDTO } from '@core/generated/SignupDTO';

export interface SignupData {
  email: string;
  fullName: string;
  password: string;
  confirmPassword: string;
  occupation: string;
  birthDate: Date;
  country: string;
  town: string;
  phoneNumber: string;
  address: string;
  role: string;
}

export namespace SignupData {
  export function mapToApiValue(data: SignupData): SignupDTO {
    return {
      email: data.email,
      nom_utilisateur: data.fullName,
      motdepasse: data.password,
      confirmmotdepasse: data.confirmPassword,
      date_naissance: data.birthDate,
      occupation: data.occupation,
      tel_utilisateur: data.phoneNumber,
      ville_user: data.town,
      pays_user: data.country,
      adresse_user: data.address,
      role : "User",
    };
  }
}
