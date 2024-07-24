import {
  SetConTokenDataAction,
  ResetConTokenDataAction,
  UpdateConTokenDataAction,
  SET_CONSULTANT_TOKEN_DATA,
  UPDATE_CONSULTANT_TOKEN_DATA,
  RESET_CONSULTANT_TOKEN_DATA
} from './types';

import { ITokenData } from '../../interfaces/token';

export const setConstultantTokenData = (data: ITokenData): SetConTokenDataAction => ({
  type: SET_CONSULTANT_TOKEN_DATA,
  payload: data
});

export const updateConstultantTokenData = (data: ITokenData): UpdateConTokenDataAction => ({
  type: UPDATE_CONSULTANT_TOKEN_DATA,
  payload: data
});

export const resetConstultantTokenData = (): ResetConTokenDataAction => ({
  type: RESET_CONSULTANT_TOKEN_DATA
});
