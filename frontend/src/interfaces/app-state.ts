import { IPageData } from './page';
import { IAppSettings } from './settings';
import { IPatient } from './patient';
import { IConsultant } from './Consultant/consultant';

export interface IAppState {
  pageData: IPageData;
  settings: IAppSettings;
  patients: IPatient[];
  consultants: IConsultant[];
}
