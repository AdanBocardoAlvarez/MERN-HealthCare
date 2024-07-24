import { ITokenData } from '../../interfaces/token';

export const SET_TOKEN_DATA = 'Token Set';
export const RESET_TOKEN_DATA = 'Token Reset';
export const UPDATE_TOKEN_DATA = 'Token Update';

export interface SetTokenDataAction {
  type: typeof SET_TOKEN_DATA;
  payload: ITokenData;
}

export interface ResetTokenDataAction {
  type: typeof RESET_TOKEN_DATA;
}

export interface UpdateTokenDataAction {
  type: typeof UPDATE_TOKEN_DATA;
  payload: ITokenData;
}

export type TokenActionsTypes = SetTokenDataAction | ResetTokenDataAction | UpdateTokenDataAction;
