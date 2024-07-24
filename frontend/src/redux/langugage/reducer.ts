import { LanguageActionsTypes, RESET_LANG_DATA, SET_LANG_DATA, UPDATE_LANG_DATA } from './types';

const initialState = {
    type: 'fr'
};

export const LanguageReducer = (
    state: { type: string } = initialState,
    action: LanguageActionsTypes
) => {
    switch (action.type) {
        case SET_LANG_DATA:
            return { ...action.payload };
        case UPDATE_LANG_DATA:
            return { ...state, ...action.payload };
        case RESET_LANG_DATA:
            return { ...initialState };
        default:
            return { ...state };
    }
};
