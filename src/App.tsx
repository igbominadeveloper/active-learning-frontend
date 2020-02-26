import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

import NavBar from './components/NavBar';

import Homepage from './pages/Homepage';
import LoginPage from './pages/Login';
import AboutPage from './pages/About';

const App = () => (
  <div className="Layout">
    <Grid columns={16}>
      <NavBar />
      <Suspense fallback={<div>Loading....</div>}>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/about" component={AboutPage} />
        </Switch>
      </Suspense>
    </Grid>
  </div>
);

export default App;
