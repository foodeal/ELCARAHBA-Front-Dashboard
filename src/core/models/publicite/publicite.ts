import { PubDTO } from '../../generated/PubDTO';

export interface PubData {
    id : number;
    titre_pub: string;
    client_pub: string;
    prix_pub: number;
    duree_pub: number;
    description_pub: string;
}

export namespace PubData {
  export function mapToApiValue(data: PubDTO): PubData {
    return {
        id : data.id,
        titre_pub: data.titre_pub,
        client_pub: data.client_pub,
        prix_pub: data.prix_pub,
        duree_pub: data.duree_pub,
        description_pub: data.description_pub
    };
  }
}