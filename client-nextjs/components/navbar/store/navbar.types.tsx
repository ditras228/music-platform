export interface NavbarState {
  isShow: boolean;
}

export enum NavbarTypes {
  SHOW_NAVBAR = "SHOW_NAVBAR",
}

interface ShowNavbar {
  type: NavbarTypes.SHOW_NAVBAR;
}

export type NavbarActions = ShowNavbar;
