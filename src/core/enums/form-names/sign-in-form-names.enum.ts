import { SigninData } from "../../models";
import { IMap } from "../../utils";

export enum SigninFormNamesEnum {
  Email = 1,
  Password = 2,
  RememberMe = 3
}

export namespace SigninFormNamesEnum {
  export type formFieldName = keyof SigninData;

  export const toPlaceholder: IMap<SigninFormNamesEnum, string> = new IMap<
    SigninFormNamesEnum,
    string
  >([
    [SigninFormNamesEnum.Email, "Nom d'utilisateur"],
    [SigninFormNamesEnum.Password, "Mot de passe"],
    [SigninFormNamesEnum.RememberMe, "remember me"]
  ]);

  export const field: IMap<SigninFormNamesEnum, formFieldName> = new IMap<
    SigninFormNamesEnum,
    formFieldName
  >([
    [SigninFormNamesEnum.Email, "email"],
    [SigninFormNamesEnum.Password, "password"],
  ]);
}
