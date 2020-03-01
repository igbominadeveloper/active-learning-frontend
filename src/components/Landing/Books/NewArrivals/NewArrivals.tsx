import React from 'react';
import { Grid } from 'semantic-ui-react';

import Book from '../Book';

import { Book as BookInterface } from '../../../../pages/Store';

interface Props {
  newArrivals: BookInterface[];
}

const NewArrivals: React.FC<Props> = ({ newArrivals }: Props) => (
  <Grid.Column width={8} className="d-flex flex-column justify-content-center books-section">
    <h3 className="Books__text-sub mt-0 text-center">New Arrivals</h3>
    <div className="details d-flex justify-content-center align-items-center flex-wrap">
      {newArrivals
        .filter((book, index) => index < 4)
        .map(book => (
          <Book key={Math.random().toFixed(5)} {...book} />
        ))}
    </div>
  </Grid.Column>
);

export default NewArrivals;
