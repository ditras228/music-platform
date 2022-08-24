import { UserAction, UsersActionTypes, UserState } from "../../types/user";

const initialState: UserState = {
  errors: [],
  isLoading: false,
  redirectTo: "",
};

export const usersReducer = (
  state = initialState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case UsersActionTypes.ADD_ERROR:
      return { ...state, errors: [...state.errors, action.payload] };
    case UsersActionTypes.IS_LOADING:
      return { ...state, isLoading: true };
    case UsersActionTypes.REDIRECT_TO:
      return { ...state, redirectTo: action.payload };
    default:
      return state;
  }
};
