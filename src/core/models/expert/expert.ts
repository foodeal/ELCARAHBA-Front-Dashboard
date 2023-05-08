import { ExpertDTO } from '@core/generated/ExpertDTO';
import { UserDTO } from '../../generated/UserDto';

export interface ExpertData {
  id: string;
  nom_prenom_expert: string;
  mail_expert: string;
  telephone_expert: string;
  domaine_expert: string;
}

export namespace ExpertData {
  export function mapToApiValue(data: ExpertDTO): ExpertData {
    return {
      id: data.id.toString(),
      mail_expert: data.mail_expert,
      nom_prenom_expert: data.nom_prenom_expert,
      telephone_expert: data.telephone_expert,
      domaine_expert: data.domaine_expert,
    };
  }
}
