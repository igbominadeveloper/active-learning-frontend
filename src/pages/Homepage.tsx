import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Switch, Route } from 'react-router-dom';

import Landing from '../components/Landing';
import NavBar from '../components/NavBar';

import AboutPage from './About';
import Store from './Store';

const Homepage = () => (
  <div className="Layout">
    <Grid columns={16}>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/about" component={AboutPage} />
        <Route path="/store" component={Store} />
      </Switch>
    </Grid>
  </div>
);

export default Homepage;
