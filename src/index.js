import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Main from './Main';
import 'bootstrap/dist/css/bootstrap.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();
