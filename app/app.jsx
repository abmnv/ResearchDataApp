var React = require('react');
var ReactDOM = require('react-dom');
var {Router, Route, IndexRoute, hashHistory} = require('react-router');
import {Provider} from 'react-redux';

import * as actions from 'actions';
import Main from 'Main';
import Projects from 'Projects';
//import EditProjects from 'EditProjects';
import EditProject from 'EditProject';
import DetailedProject from 'DetailedProject';
import CreateProject from 'CreateProject';
import Login from 'Login';
import SignUp from 'SignUp';
import EnsureLoggedInContainer from 'EnsureLoggedInContainer';

var store = require('configureStore').configure();
var state = store.getState();
console.log('Init state:', state);

store.dispatch(actions.startAddProjects());

// var store = require('configureStore').configure();
store.subscribe(() => {
  var state = store.getState();
  console.log('New state:', state);
})

//load foundation
//require('style!css!foundation-sites/dist/foundation.min.css');
$(document).foundation();

require('style!css!sass!ApplicationStyles');

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={Main}>
        <IndexRoute component={Projects}/>
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={SignUp}/>
        <Route path="/projects/:projectId" component={DetailedProject}/>
        <Route component={EnsureLoggedInContainer}>
          <Route path="/edit-projects" component={Projects}/>
          <Route path="/create-project" component={CreateProject}/>
          <Route path="/edit-projects/:projectId" component={EditProject}/>
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
//<Route path="data" component={Data}/>
