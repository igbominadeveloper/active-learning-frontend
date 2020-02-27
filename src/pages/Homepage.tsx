import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Switch, Route } from 'react-router-dom';

import Landing from '../components/Landing';
import NavBar from '../components/NavBar';

import AboutPage from './About';
import Store from './Store';
import MyProfile from './MyProfile';
import AdminPage from './Admin';

const Homepage = () => (
  <div className="Layout">
    <Grid columns={16}>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/store" component={Store} />
        <Route exact path="/my-profile" component={MyProfile} />
        <Route path="/admin" component={AdminPage} />
      </Switch>
    </Grid>
  </div>
);

export default Homepage;
