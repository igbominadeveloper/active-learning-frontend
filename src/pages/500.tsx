import React from 'react';
import { Grid, Image, Button } from 'semantic-ui-react';

import Illustration from '../assets/images/500.svg';

const FiveHundredErrorPage = () => (
  <Grid columns={16} className="p-0 m-0 page-500 justify-content-center align-items-center">
    <Image
      src={Illustration}
      className="m-0 p-0 illustration"
    />
    <div className="bottom-section d-flex align-items-center flex-column">
      <p className="message text-bold">
        Something is wrong on this server, but it is not your fault
      </p>
      <a href="/" className="animated infinite pulse cursor-pointer">
        <Button inverted color="black" className="refresh">Please Refresh</Button>
      </a>
    </div>
  </Grid>
);

export default FiveHundredErrorPage;
