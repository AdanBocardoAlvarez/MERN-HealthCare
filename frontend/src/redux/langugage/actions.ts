import {
	RESET_LANG_DATA,
	ResetLanguageDataAction,
	SET_LANG_DATA,
	SetLanguageDataAction,
	UPDATE_LANG_DATA,
	UpdateLanguageDataAction
} from './types';

export const setLangData = (data: { type: string }): SetLanguageDataAction => ({
	type: SET_LANG_DATA,
	payload: data
});

export const updateLangData = (data: { type: string }): UpdateLanguageDataAction => ({
	type: UPDATE_LANG_DATA,
	payload: data
});

export const resetLangData = (): ResetLanguageDataAction => ({
	type: RESET_LANG_DATA
});
