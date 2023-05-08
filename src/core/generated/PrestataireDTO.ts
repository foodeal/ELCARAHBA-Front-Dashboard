export interface PrestataireDTO {
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
  motdepasse?: string;
}
