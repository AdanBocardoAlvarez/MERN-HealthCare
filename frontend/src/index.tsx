import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';

const basename = document.querySelector('base')?.getAttribute('href') ?? '/'

createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <Suspense fallback={<div>Loading....</div>}>
            <BrowserRouter basename={basename}>
                <App />
            </BrowserRouter>
        </Suspense>
    </Provider>
);
