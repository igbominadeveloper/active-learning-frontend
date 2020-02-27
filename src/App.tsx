import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import Homepage from './pages/Homepage';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';

const App = () => (
  <Suspense fallback={<div>Loading....</div>}>
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/" component={Homepage} />
    </Switch>
  </Suspense>
);

export default App;
