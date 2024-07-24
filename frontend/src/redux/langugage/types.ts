export const SET_LANG_DATA = '[language] Set';
export const RESET_LANG_DATA = '[language] Reset';
export const UPDATE_LANG_DATA = '[language] Update';

export interface SetLanguageDataAction {
  type: typeof SET_LANG_DATA;
  payload: { type: string };
}

export interface ResetLanguageDataAction {
  type: typeof RESET_LANG_DATA;
}

export interface UpdateLanguageDataAction {
  type: typeof UPDATE_LANG_DATA;
  payload: { type: string };
}
export type LanguageActionsTypes = | SetLanguageDataAction | ResetLanguageDataAction | UpdateLanguageDataAction;
