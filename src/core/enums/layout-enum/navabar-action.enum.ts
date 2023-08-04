import { SelectItemData } from "@shared/interfaces";
import { IMap } from "../../utils";
import {RouterPaths} from "../../constant"

export enum NavbarActionsEnum {
  Home = "/",
  Offers = "2",
  About = "3",
  Partners = "4",
  Diagnosis = "5",
  // Blog = "6",
  Tracking = "6"
}

export namespace NavbarActionsEnum {
  const values: NavbarActionsEnum[] = [
    NavbarActionsEnum.Home,
    NavbarActionsEnum.Offers,
    NavbarActionsEnum.About,
    NavbarActionsEnum.Partners,
    NavbarActionsEnum.Diagnosis,
    // NavbarActionsEnum.Blog,
    NavbarActionsEnum.Tracking
  ];

  export const toString: IMap<NavbarActionsEnum, string> = new IMap<
    NavbarActionsEnum,
    string
  >([
    [NavbarActionsEnum.Home, "Accueil"],
    [NavbarActionsEnum.Offers, "Offres"],
    [NavbarActionsEnum.About, "A propos"],
    [NavbarActionsEnum.Partners, "Nos Prestataires"],
    [NavbarActionsEnum.Diagnosis, "Diagnostique"],
    // [NavbarActionsEnum.Blog, "Blog"],
    [NavbarActionsEnum.Tracking, "Suivi"]
  ]);

  export const toLink: IMap<NavbarActionsEnum, string> = new IMap<
    NavbarActionsEnum,
    string
  >([
    [NavbarActionsEnum.Home, RouterPaths.RootPaths.rootPath],
    [NavbarActionsEnum.Offers, RouterPaths.RootPaths.offersPath],
    [NavbarActionsEnum.About, RouterPaths.RootPaths.aboutPath],
    [NavbarActionsEnum.Partners, RouterPaths.RootPaths.partnersPath],
    [NavbarActionsEnum.Diagnosis, RouterPaths.RootPaths.diagnosisPath],
    // [NavbarActionsEnum.Blog, "Blog"],
    [NavbarActionsEnum.Tracking, RouterPaths.RootPaths.trackingPath]
  ]);

  export function mapToSelectItem(
    item: NavbarActionsEnum
  ): SelectItemData<NavbarActionsEnum> {
    return {
      value: item,
      name: toString.getValue(item),
      link: toLink.getValue(item)    
    };
  }

  export const selectedItems = values.map(it => mapToSelectItem(it));
}
