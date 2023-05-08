import { SelectItemData } from "@shared/interfaces";
import { IMap } from "../../utils";

export enum FooterActionsEnum {
  Home = 1,
  Offers = 2,
  shop = 3,
  Publications = 4,
  Diagnosis = 5,
  About = 6,
  RegisterCar = 7,
  ServiceProvider = 8,
  Terms = 9,
  Faq = 10
}

export namespace FooterFirstSectionActionsEnum {
  const values: FooterActionsEnum[] = [
    FooterActionsEnum.Home,
    FooterActionsEnum.Offers,
    FooterActionsEnum.shop,
    FooterActionsEnum.Publications,
    FooterActionsEnum.Diagnosis
  ];

  export const toString: IMap<FooterActionsEnum, string> = new IMap<
    FooterActionsEnum,
    string
  >([
    [FooterActionsEnum.Home, "Accueil"],
    [FooterActionsEnum.Offers, "Nos offres"],
    [FooterActionsEnum.shop, "Boutique"],
    [FooterActionsEnum.Publications, "Publications"],
    [FooterActionsEnum.Diagnosis, "Diagnostique"]
  ]);

  export function mapToSelectItem(
    item: FooterActionsEnum
  ): SelectItemData<FooterActionsEnum> {
    return {
      value: item,
      name: toString.getValue(item)
    };
  }

  export const selectedItems = values.map(it => mapToSelectItem(it));
}

export namespace FooterSecondSectionActionsEnum {
  const values: FooterActionsEnum[] = [
    FooterActionsEnum.About,
    FooterActionsEnum.RegisterCar,
    FooterActionsEnum.ServiceProvider,
    FooterActionsEnum.Terms,
    FooterActionsEnum.Faq
  ];

  export const toString: IMap<FooterActionsEnum, string> = new IMap<
    FooterActionsEnum,
    string
  >([
    [FooterActionsEnum.About, "À propos de nous"],
    [FooterActionsEnum.RegisterCar, "Inscrivez votre voiture ?"],
    [FooterActionsEnum.ServiceProvider, "Vous êtes Prestataire ?"],
    [FooterActionsEnum.Terms, "Termes Et Conditions"],
    [FooterActionsEnum.Faq, "FAQ"]
  ]);

  export function mapToSelectItem(
    item: FooterActionsEnum
  ): SelectItemData<FooterActionsEnum> {
    return {
      value: item,
      name: toString.getValue(item)
    };
  }

  export const selectedItems = values.map(it => mapToSelectItem(it));
}
