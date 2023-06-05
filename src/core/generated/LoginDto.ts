export interface LoginDTO {
  email: string;
  motdepasse: string;
}

/*

"id": 11,
    "nom_utilisateur": "Brahim",
    "prenom_utilisateur": "El Moustaph",
    "date_naissance": "1994-12-20",
    "email": "brahim@carhba.com",
    "tel_utilisateur": "36265757",
    "role": "Admin",
    "pays_user": "Tunis",
    "ville_user": "Tunis",
    "adresse_user": "Tunis",
    "motdepasse": "$2a$10$F4O1pt9ataws33382ez6vuZ3D4P0zX/DQUnwQCOfY5ElJuRg7y.ca",
    "argent_gagner": 0,
    "point_gagner": null,
    "createdAt": "2023-03-21T05:26:09.000Z",
    "updatedAt": "2023-03-21T05:26:09.000Z",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjExLCJpYXQiOjE2ODU5MjYwODcsImV4cCI6MTY4NjUzMDg4N30.RUgS2wvhg35nXjrN2dSFB_N_ld1ggOB66XzfplsnLe8"*/

export interface LoginInterface {
  id: number;
  nom_utilisateur: string;
  prenom_utilisateur: string;
  date_naissance: string;
  email: string;
  tel_utilisateur: string;
  role: string;
  pays_user: string;
  ville_user: string;
  adresse_user: string;
  motdepasse: string;
  argent_gagner: number;
  point_gagner: number;
  createdAt: string;
  updatedAt: string;
  token: string;
}

export namespace LoginData {
  export function mapToApiValue(data: LoginInterface): LoginInterface {
    return {
      id: data.id,
      nom_utilisateur: data.nom_utilisateur,
      prenom_utilisateur: data.prenom_utilisateur,
      date_naissance: data.date_naissance,
      email: data.email,
      tel_utilisateur: data.tel_utilisateur,
      role: data.role,
      pays_user: data.pays_user,
      ville_user: data.ville_user,
      adresse_user: data.adresse_user,
      motdepasse: data.motdepasse,
      argent_gagner: data.argent_gagner,
      point_gagner: data.point_gagner,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      token: data.token,
    };
  }
}


