import React from 'react';
import { Grid } from 'semantic-ui-react';

import NavBar from '../NavBar';
import Hero from './Hero';
import Books from './Books';

import './Landing.scss';

const Landing = () => {
  return (
    <div className="Layout">
      <Grid columns={16}>
        <NavBar />
        <Hero />
        <Books />
      </Grid>
    </div>
  );
}

export default Landing;
