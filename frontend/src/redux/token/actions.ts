import {
  SetTokenDataAction,
  ResetTokenDataAction,
  UpdateTokenDataAction,
  SET_TOKEN_DATA,
  UPDATE_TOKEN_DATA,
  RESET_TOKEN_DATA
} from './types';

import { ITokenData } from '../../interfaces/token';

export const setTokenData = (data: ITokenData): SetTokenDataAction => ({
  type: SET_TOKEN_DATA,
  payload: data
});

export const updateTokenData = (data: ITokenData): UpdateTokenDataAction => ({
  type: UPDATE_TOKEN_DATA,
  payload: data
});

export const resetTokenData = (): ResetTokenDataAction => ({
  type: RESET_TOKEN_DATA
});
