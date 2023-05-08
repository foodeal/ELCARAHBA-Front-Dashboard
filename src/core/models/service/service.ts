import { ServiceDTO } from './../../generated/ServiceDTO';

export interface ServiceData {
  id: number;
  nom: string;
  modele: string;
  type_motorisation: string;
  categorie: string;
  reference: string;
  prix: number;
  description: string;
  offre_id: number;
}

export namespace ServiceData {
  export function mapToApiValue(data: ServiceDTO): ServiceData {
    return {
      id: data.id,
      nom: data.nom,
      modele: data.modele,
      type_motorisation: data.type_motorisation,
      categorie: data.categorie,
      reference: data.reference,
      prix: data.prix,
      description: data.description,
      offre_id: data.offre_id
    };
  }
}
