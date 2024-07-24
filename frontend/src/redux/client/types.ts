import { ITokenData } from '../../interfaces/token';

export const SET_CLIENT_TOKEN_DATA = '[client] Set';
export const RESET_CLIENT_TOKEN_DATA = '[client] Reset';
export const UPDATE_CLIENT_TOKEN_DATA = '[client] Update';

export const SET_CLIENT_DOC_DATA = '[doc] Set';
export const RESET_CLIENT_DOC_DATA = '[doc] Reset';

export interface SetClientTokenDataAction {
  type: typeof SET_CLIENT_TOKEN_DATA;
  payload: ITokenData;
}

export interface ResetClientTokenDataAction {
  type: typeof RESET_CLIENT_TOKEN_DATA;
}

export interface UpdateClientTokenDataAction {
  type: typeof UPDATE_CLIENT_TOKEN_DATA;
  payload: ITokenData;
}

export interface SetClientDocDataAction {
  type: typeof SET_CLIENT_DOC_DATA;
  payload: {};
}

export interface ResetClientDocDataAction {
  type: typeof RESET_CLIENT_DOC_DATA;
}

export type TokenClientActionsTypes =
  | SetClientTokenDataAction
  | ResetClientTokenDataAction
  | UpdateClientTokenDataAction;

export type TokenClientDocDataTypes = SetClientDocDataAction | ResetClientDocDataAction;
