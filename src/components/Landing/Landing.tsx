import React from 'react';
import { Grid } from 'semantic-ui-react';

import NavBar from '../NavBar';

import './Landing.scss';

const Landing = () => {
  return (
    <div className="Layout">
      <Grid columns={16}>
        <NavBar />
      </Grid>
    </div>
  );
}

export default Landing;
