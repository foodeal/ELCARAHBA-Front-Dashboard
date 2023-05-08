import { ProduitDTO } from './../../generated/ProduitDTO';

export interface ProduitData {
  id: number;
  nom: string;
  marque: string;
  modele: string;
  type_motorisation: string;
  categorie: string;
  reference: string;
  prix: number;
  description: string;
  offre_id: number;
}

export namespace ProduitData {
  export function mapToApiValue(data: ProduitDTO): ProduitData {
    return {
      id: data.id,
      nom: data.nom,
      marque: data.marque,
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
