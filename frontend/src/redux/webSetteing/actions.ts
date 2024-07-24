import {
	IWebSettings,
	SET_SETTING_DATA,
	SetSettingDataAction,
} from './types';

export const setWebSettingData = (data: IWebSettings): SetSettingDataAction => ({
	type: SET_SETTING_DATA,
	payload: data
});