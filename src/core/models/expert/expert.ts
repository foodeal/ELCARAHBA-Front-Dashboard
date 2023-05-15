import { ExpertDTO } from "src/core/generated/ExpertDTO";


export namespace ExpertData {
  export function mapToApiValue(data: ExpertDTO): ExpertDTO {
    return {
      id: data.id,
      mail_expert: data.mail_expert,
      nom_prenom_expert: data.nom_prenom_expert,
      telephone_expert: data.telephone_expert,
      domaine_expert: data.domaine_expert,
      createdAt: data.createdAt
    };
  }
}
