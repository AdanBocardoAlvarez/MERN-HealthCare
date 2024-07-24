import { ITokenData } from '../../interfaces/token';

export const SET_CONSULTANT_TOKEN_DATA = '[Consultant] Set';
export const RESET_CONSULTANT_TOKEN_DATA = '[Consultant] Reset';
export const UPDATE_CONSULTANT_TOKEN_DATA = '[Consultant] Update';

export interface SetConTokenDataAction {
  type: typeof SET_CONSULTANT_TOKEN_DATA;
  payload: ITokenData;
}

export interface ResetConTokenDataAction {
  type: typeof RESET_CONSULTANT_TOKEN_DATA;
}

export interface UpdateConTokenDataAction {
  type: typeof UPDATE_CONSULTANT_TOKEN_DATA;
  payload: ITokenData;
}

export type TokenConActionsTypes =
  | SetConTokenDataAction
  | ResetConTokenDataAction
  | UpdateConTokenDataAction;
