import { UserDTO } from '../../generated/UserDto';

export interface UserDetails {
  id: string;
  token: string;
  email: string;
  nom_utilisateur: string;
  prenom_utilisateur: string;
  date_naissance: string;
  role: string;
  pays_user: string;
  tel_utilisateur: string;
  ville_user: string;
  adresse_user: string;
  argent_gagner: number;
  motdepasse: string;
}

export namespace UserDetails {
  export function mapToApiValue(data: UserDTO): UserDetails {
    return {
      id: data.id.toString(),
      token: data.token,
      email: data.email,
      nom_utilisateur: data.nom_utilisateur,
      prenom_utilisateur: data.prenom_utilisateur,
      date_naissance: data.date_naissance,
      role: data.role,
      pays_user: data.pays_user,
      tel_utilisateur: data.tel_utilisateur,
      ville_user: data.ville_user,
      adresse_user: data.adresse_user,
      argent_gagner: data.argent_gagner,
      motdepasse: data.motdepasse
    };
  }
}
