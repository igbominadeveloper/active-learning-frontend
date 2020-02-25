import React from 'react';
import { Grid } from 'semantic-ui-react';

import NavBar from '../NavBar';
import Hero from './Hero';

import './Landing.scss';

const Landing = () => {
  return (
    <div className="Layout">
      <Grid columns={16}>
        <NavBar />
        <Hero />
      </Grid>
    </div>
  );
}

export default Landing;
