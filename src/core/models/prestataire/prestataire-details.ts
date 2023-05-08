import { PrestataireDTO } from '@core/generated/PrestataireDTO';
import { UserDTO } from '../../generated/UserDto';

export interface PrestataireDetails {
  id: string;
  token: string;
  nom_prestataire: string;
  prenom_prestataire: string;
  raison_sociale: string;
  role: string;
  pays_prestataire: string;
  email_prestataire: string;
  tel_prestataire: string;
  ville_prestataire: string;
  adresse_prestataire: string;
  service_prestataire: string;
  site_web: string;
  lien_fb: string;
  lien_insta: string;
  registre_commerce: string;
  cin_gerant: string;
  contrat_condition: string;
  description: string;
  motdepasse: stinrg;
}

export namespace PrestataireDetails {
  export function mapToApiValue(data: PrestataireDTO): PrestataireDetails {
    return {
      id: data.id.toString(),
      token: data.token,
      nom_prestataire: data.nom_prestataire,
      prenom_prestataire: data.prenom_prestataire,
      email_prestataire: data.email_prestataire,
      tel_prestataire: data.tel_prestataire,
      raison_sociale: data.raison_sociale,
      role: data.role,
      pays_prestataire: data.pays_prestataire,
      ville_prestataire: data.ville_prestataire,
      adresse_prestataire: data.adresse_prestataire,
      service_prestataire: data.service_prestataire,
      site_web: data.site_web,
      lien_fb: data.lien_fb,
      lien_insta: data.lien_insta,
      registre_commerce: data.registre_commerce,
      cin_gerant: data.cin_gerant,
      contrat_condition: data.contrat_condition,
      description: data.description,
      motdepasse: data.motdepasse,
    };
  }
}
