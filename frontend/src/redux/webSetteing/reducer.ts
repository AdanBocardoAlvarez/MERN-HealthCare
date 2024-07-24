import { SetSettingDataAction, SET_SETTING_DATA, IWebSettings } from './types';
import MainLogo from "../../assets/img/vhealthy-logo.png"

const initialState = {
	web_title: 'VHealTHY',
	domain_name_without_extension: '',
	web_logo: MainLogo,
	footer_logo: MainLogo,
	email_logo: MainLogo,
	fab_icon: MainLogo,
	web_tw: 'https://www.twitter.com/LavieVhealthy',
	web_yt: 'https://www.youtube.com/@Ingrid.Louise',
	web_insta: 'https://www.instagram.com/vhealthybyetherna',
	web_linkedin: 'https://www.linkedin.com/company/vhealthy',
	web_legal_name: 'VHealTHY',
};

export const WebSetteingReducer = (
	state: IWebSettings = initialState,
	action: SetSettingDataAction
) => {
	switch (action.type) {
		case SET_SETTING_DATA:
			return { ...action.payload };
		default:
			return { ...state };
	}
};
