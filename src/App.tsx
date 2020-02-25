import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import Homepage from './pages/Homepage';
import LoginPage from './pages/Login';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Homepage} />
      <Route path="/login" component={LoginPage} />
    </Switch>
  </Router>
);

export default App;
