import { legacy_createStore as createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { settingsReducer, pageDataReducer, patientsReducer, tokenConDataReducer, tokenDataReducer, ClientReducer, LanguageReducer, WebSetteingReducer } from './index';

function saveToLocalStorage(state) {
    try {
        const serialisedState = JSON.stringify(state);
        localStorage.setItem('persistantState', serialisedState);
    } catch (e) {
        console.warn(e);
    }
}
function loadFromLocalStorage() {
    try {
        const serialisedState = localStorage.getItem('persistantState');
        if (serialisedState === null) return undefined;
        return JSON.parse(serialisedState);
    } catch (e) {
        console.warn(e);
        return undefined;
    }
}

const rootReducer = combineReducers({
    pageData: pageDataReducer,
    settings: settingsReducer,
    patients: patientsReducer,
    admin: tokenDataReducer,
    consultant: tokenConDataReducer,
    client: ClientReducer,
    language: LanguageReducer,
    webSettings: WebSetteingReducer
});

export type AppState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, loadFromLocalStorage(), compose(applyMiddleware(thunk)));

store.subscribe(() => saveToLocalStorage(store.getState()));
export default store;
