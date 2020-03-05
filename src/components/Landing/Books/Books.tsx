import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';

import NewArrivals from './NewArrivals';
import AmazingOffers from './AmazingOffers';

import { Book as BookInterface } from '../../../pages/Store';

import './Books.scss';

interface Props {
  products: BookInterface[];
}

const Books: React.FC<Props> = ({ products }: Props) => {
  const newArrivals: BookInterface[] = products.sort(
    (current, next) => Date.parse(next.publishedAt) - Date.parse(current.publishedAt)
  );
  const amazingOffers: BookInterface[] = products.filter(product => product.specialOffer === true);

  return (
    <Grid.Row className="Books text-left">
      <Segment.Group horizontal className="w-100 Books__segments">
        <Grid columns={16} className="w-100 m-0 book-section">
          <NewArrivals newArrivals={newArrivals} />
          <AmazingOffers amazingOffers={amazingOffers} />
        </Grid>
      </Segment.Group>
    </Grid.Row>
  );
};

export default Books;
