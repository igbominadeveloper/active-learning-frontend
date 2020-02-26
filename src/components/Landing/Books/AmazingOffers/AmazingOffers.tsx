import React from 'react';
import { Grid } from 'semantic-ui-react';

import Book from '../Book';

const AmazingOffers = () => (
  <Grid.Column width={8} className="d-flex flex-column justify-content-center books-section">
    <h3 className="Books__text-sub mt-0 text-center">Amazing Offers</h3>
    <div className="details d-flex justify-content-center align-items-center flex-wrap">
      <Book />
      <Book />
      <Book />
      <Book />
    </div>
  </Grid.Column>
);

export default AmazingOffers;
