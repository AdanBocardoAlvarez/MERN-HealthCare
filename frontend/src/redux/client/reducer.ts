import {
  RESET_CLIENT_DOC_DATA,
  RESET_CLIENT_TOKEN_DATA,
  SET_CLIENT_DOC_DATA,
  SET_CLIENT_TOKEN_DATA,
  TokenClientActionsTypes,
  UPDATE_CLIENT_TOKEN_DATA,
  TokenClientDocDataTypes
} from './types';
import { ITokenData } from '../../interfaces/token';

const initialState = {
  Token: '',
  status: false
};

export const ClientReducer = (
  state: ITokenData = initialState,
  action: TokenClientActionsTypes
) => {
  switch (action.type) {
    case SET_CLIENT_TOKEN_DATA:
      return { ...action.payload };
    case UPDATE_CLIENT_TOKEN_DATA:
      return { ...state, ...action.payload };
    case RESET_CLIENT_TOKEN_DATA:
      return { ...initialState };
    default:
      return { ...state };
  }
};

const initialStateDoc = {
  doctor: {}
};

export const ClientDoctorReducer = (state = initialStateDoc, action: TokenClientDocDataTypes) => {
  switch (action.type) {
    case SET_CLIENT_DOC_DATA:
      return { ...action.payload };
    case RESET_CLIENT_DOC_DATA:
      return { ...initialStateDoc };
    default:
      return { ...state };
  }
};
