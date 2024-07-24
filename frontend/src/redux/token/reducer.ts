import { TokenActionsTypes, SET_TOKEN_DATA, RESET_TOKEN_DATA, UPDATE_TOKEN_DATA } from './types';
import { ITokenData } from '../../interfaces/token';

const initialState: ITokenData = {
  Token: '',
  status: false
};

export const tokenDataReducer = (state: ITokenData = initialState, action: TokenActionsTypes) => {
  switch (action.type) {
    case SET_TOKEN_DATA:
      return { ...action.payload };
    case UPDATE_TOKEN_DATA:
      return { ...state, ...action.payload };
    case RESET_TOKEN_DATA:
      return { ...initialState };
    default:
      return { ...state };
  }
};
