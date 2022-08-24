import { NavbarActions, NavbarTypes } from "./navbar.types";

export const showNavbar = (): NavbarActions => {
  return { type: NavbarTypes.SHOW_NAVBAR };
};
