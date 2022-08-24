import { NavbarActions, NavbarState, NavbarTypes } from "./navbar.types";

const initialState: NavbarState = {
  isShow: false,
};

export const navbarReducer = (
  state = initialState,
  action: NavbarActions
): NavbarState => {
  switch (action.type) {
    case NavbarTypes.SHOW_NAVBAR:
      return { ...state, isShow: !state.isShow };
    default:
      return state;
  }
};
