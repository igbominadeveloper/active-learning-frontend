import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';

import NewArrivals from './NewArrivals';
import AmazingOffers from './AmazingOffers';

import './Books.scss';

const Books = () => (
  <Grid.Row className="Books text-left">
    <Segment.Group horizontal className="w-100 Books__segments">
      <Grid columns={16} className="w-100 m-0">
        <NewArrivals />
        <AmazingOffers />
      </Grid>
    </Segment.Group>
  </Grid.Row>
);

export default Books;
