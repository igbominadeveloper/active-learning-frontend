import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import Homepage from './pages/Homepage';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';


toast.configure({
  autoClose: 3000,
  draggable: false,
});

const App = () => (
  <Suspense fallback={<div>Loading....</div>}>
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/register" component={RegisterPage} />
      <Route path="/" component={Homepage} />
    </Switch>
  </Suspense>
);

export default App;
