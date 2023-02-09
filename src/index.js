import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import reportWebVitals from './reportWebVitals';

import App from './App';
import store from './store';
import './index.css';

ReactDOM.render(
    // <React.StrictMode> // Conflict with @material-ui v4
        <Provider store={store}>
            <App/>
        </Provider>,
    // </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
