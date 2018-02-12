import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { Provider } from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Routing from '/src/app/shared/Router';
import {store} from '/src/app/shared/AppState';

injectTapEventPlugin();

ReactDOM.render((
  <Provider store={store}>
  	  <Router>
        <Route path='/' component={Routing}/>
      </Router>
  </Provider>
  ),
  document.getElementById('root'));
