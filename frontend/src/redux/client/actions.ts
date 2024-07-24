import {
  RESET_CLIENT_DOC_DATA,
  RESET_CLIENT_TOKEN_DATA,
  ResetClientDocDataAction,
  ResetClientTokenDataAction,
  SET_CLIENT_DOC_DATA,
  SET_CLIENT_TOKEN_DATA,
  SetClientDocDataAction,
  SetClientTokenDataAction,
  UPDATE_CLIENT_TOKEN_DATA,
  UpdateClientTokenDataAction
} from './types';

import { ITokenData } from '../../interfaces/token';

export const setClientTokenData = (data: ITokenData): SetClientTokenDataAction => ({
  type: SET_CLIENT_TOKEN_DATA,
  payload: data
});

export const updateClientTokenData = (data: ITokenData): UpdateClientTokenDataAction => ({
  type: UPDATE_CLIENT_TOKEN_DATA,
  payload: data
});

export const resetClientTokenData = (): ResetClientTokenDataAction => ({
  type: RESET_CLIENT_TOKEN_DATA
});

export const setClientDocData = (data: ITokenData): SetClientDocDataAction => ({
  type: SET_CLIENT_DOC_DATA,
  payload: data
});

export const resetClientDocData = (): ResetClientDocDataAction => ({
  type: RESET_CLIENT_DOC_DATA
});
