export const SET_SETTING_DATA = '[settings] Set';

export interface IWebSettings {
	web_title: string;
	domain_name_without_extension: string;
	web_logo: string;
	footer_logo: string;
	email_logo: string;
	fab_icon: string;
	web_tw: string;
	web_yt: string;
	web_insta: string;
	web_linkedin: string;
	web_legal_name: string;
}

export interface SetSettingDataAction {
	type: typeof SET_SETTING_DATA;
	payload: IWebSettings;
}


export type SettingActionsTypes = | SetSettingDataAction;
