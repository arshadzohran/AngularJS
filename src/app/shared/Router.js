import {history} from '/src/app/shared/AppState';
// import Login from '/src/app/login/login';
// import auth from '/src/app/login/auth';
import App from '/src/app/app';
// import Searchlight from '/src/app/searchlight/searchlight';
// import Forecasting from '/src/app/navigation/forecasting';
// import Operations from '/src/app/operations/operations';
//import SearchlightLanding from '/src/app/searchlight/searchlightLanding';
import React, {Component} from 'react';

//import {Router, Route, IndexRedirect, IndexRoute} from 'react-router';

import {HashRouter as Router, Route, Switch, withRouter, Redirect} from 'react-router-dom';

let requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: '/' }
    });
  }
};

class _Routing extends Component {
  render() {
    return <Switch>
      <Route exact path='/' component={App}/>
      {/* <Route exact path='/login' component={Login}/> */}
      {/* <Route exact path='/operations' component={Operations}/>
      <Route exact path='/forecasting' component={Forecasting}/>
      <Route exact path='/forecasting/sl-landing' component={SearchlightLanding}/>
      <Route exact path='/forecasting/searchlight' component={Searchlight}/> */}
    </Switch>;
  }
}

const Routing = withRouter(_Routing);

export default Routing;


/*
<Router history={history}>
    <Route path='/login' component={Login} />
    <Route path="/" component={App} onEnter={requireAuth}>
      <Route path="/operations" title="Operations">
        <IndexRoute component={Operations} />
      </Route>
      <Route path="/forecasting" title="Forecasting">
        <IndexRoute component={Forecasting} />
        <Route path="/forecasting/sl-landing" title="Searchlight Landing">
          <IndexRoute component={SearchlightLanding} />
        </Route>
        <Route path="/forecasting/searchlight" title="Searchlight">
          <IndexRoute component={Searchlight} />
        </Route>
      </Route>
    </Route>
  </Router>
  */