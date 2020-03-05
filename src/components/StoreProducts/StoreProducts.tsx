import React, { useEffect } from 'react';
import { Grid, Placeholder } from 'semantic-ui-react';

import Book from '../Landing/Books/Book';

import { Book as BookInterface } from '../../pages/Store';
import { dummyArray } from '../../utils/general';

interface ProductInterface {
  products: BookInterface[];
  fetchAllProducts: Function;
  loading: boolean;
}

export const CardLoader = () => (
  <div className="Book comment shadow" style={{ height: '8rem', padding: '10px' }}>
    <Placeholder fluid>
      <Placeholder.Line length="full" />
      <Placeholder.Line length="full" />
      <Placeholder.Line length="full" />
      <Placeholder.Line length="full" />
    </Placeholder>
  </div>
);

const StoreProducts: React.FC<ProductInterface> = ({
  fetchAllProducts,
  loading,
  products,
}: ProductInterface) => {
  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  return (
    <Grid.Row className="Books w-100">
      <Grid columns={16} className="w-100 m-0 d-flex justify-content-evenly">
        {loading ? (
          dummyArray.map(() => <CardLoader key={Math.random().toFixed(6)} />)
        ) : products.length > 0 ? (
          products.map(product => <Book key={Math.random().toFixed(6)} {...product} />)
        ) : (
          <p>No Products found</p>
        )}
      </Grid>
    </Grid.Row>
  );
};

export default StoreProducts;
