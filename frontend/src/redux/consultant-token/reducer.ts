import {
  TokenConActionsTypes,
  SET_CONSULTANT_TOKEN_DATA,
  RESET_CONSULTANT_TOKEN_DATA,
  UPDATE_CONSULTANT_TOKEN_DATA
} from './types';
import { ITokenData } from '../../interfaces/token';

const initialState: ITokenData = {
  Token: '',
  status: false,
  verified_status: null,
  active_status: null,
  BasicDetails: null,
  AddressDetails: null,
  BankDetails: null,
  CertificateDetail: null,
  ProfileDetail: null,
  EducationDetails: null,
  TimeSlotDetails: null
};

export const tokenConDataReducer = (
  state: ITokenData = initialState,
  action: TokenConActionsTypes
) => {
  switch (action.type) {
    case SET_CONSULTANT_TOKEN_DATA:
      return { ...action.payload };
    case UPDATE_CONSULTANT_TOKEN_DATA:
      return { ...state, ...action.payload };
    case RESET_CONSULTANT_TOKEN_DATA:
      return { ...initialState };
    default:
      return { ...state };
  }
};
