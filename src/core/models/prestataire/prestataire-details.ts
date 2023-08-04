import { PrestataireDTO } from '../../generated/PrestataireDTO';

export namespace PrestataireDetails {
  export function mapToApiValue(data: PrestataireDTO): PrestataireDTO {
    return {
      id: data.id.toString(),
      nom_prestataire: data.nom_prestataire,
      prenom_prestataire: data.prenom_prestataire,
      email_prestataire: data.email_prestataire,
      tel_prestataire: data.tel_prestataire,
      raison_sociale: data.raison_sociale,
      role: data.role,
      pays_prestataire: data.pays_prestataire,
      ville_prestataire: data.ville_prestataire,
      adresse_prestataire: data.adresse_prestataire,
      site_web: data.site_web,
      lien_fb: data.lien_fb,
      lien_insta: data.lien_insta,
      registre_commerce: data.registre_commerce,
      cin_gerant: data.cin_gerant,
      contrat_condition: data.contrat_condition,
      description: data.description,
    };
  }
}
