import { SignupDTO } from '@core/generated/SignupDTO';

export interface SignupData {
  email: string;
  nom_utilisateur: string;
  motdepasse: string;
  date_naissance: Date;
  tel_utilisateur: string;
  ville_user: string;
  pays_user: string;
  adresse_user: string;
  confirmmotdepasse: string;
  occupation: string;  
  role: string;
}

export namespace SignupData {
  export function mapToApiValue(data: SignupData): SignupDTO {
    return {
      email: data.email,
      nom_utilisateur: data.nom_utilisateur,
      motdepasse: data.motdepasse,
      date_naissance: data.date_naissance,
      tel_utilisateur: data.tel_utilisateur,
      ville_user: data.ville_user,
      pays_user: data.pays_user,
      adresse_user: data.adresse_user,
      confirmmotdepasse: data.confirmmotdepasse,
      occupation: data.occupation,
      role : "User",
    };
  }
}
