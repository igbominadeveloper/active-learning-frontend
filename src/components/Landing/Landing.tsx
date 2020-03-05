import React, { useEffect } from 'react';
import { Grid, Segment } from 'semantic-ui-react';

import Hero from './Hero';
import Books from './Books';

import { CardLoader } from '../StoreProducts/StoreProducts';

import { Book } from '../../pages/Store';

import { dummyArray } from '../../utils/general';

import './Landing.scss';
import './Books/Books.scss';


interface Props {
  fetchAllProducts: Function;
  products: Book[];
  loading: boolean;
}

const Landing: React.FC<Props> = ({ fetchAllProducts, products, loading }: Props) => {
  useEffect(() => {
    fetchAllProducts();
    return () => {};
  }, [fetchAllProducts]);

  return (
    <>
      <Hero />
      {loading ? (
        <Grid.Row className="Books text-left">
          <Segment.Group horizontal className="w-100 Books__segments">
            <Grid columns={16} className="w-100 m-0">
              <Grid.Column
                width={8}
                className="d-flex flex-column justify-content-center books-section"
              >
                <h3 className="Books__text-sub mt-0 text-center">New Arrivals</h3>
                <div className="details d-flex justify-content-center align-items-center flex-wrap w-100">
                  {dummyArray
                    .filter((item, index) => index < 6)
                    .map(book => (
                      <CardLoader key={Math.random().toFixed(5)} />
                    ))}
                </div>
              </Grid.Column>
              <Grid.Column
                width={8}
                className="d-flex flex-column justify-content-center books-section"
              >
                <h3 className="Books__text-sub mt-0 text-center">Amazing Offers</h3>
                <div className="details d-flex justify-content-center align-items-center flex-wrap w-100">
                  {dummyArray
                    .filter((item, index) => index < 6)
                    .map(book => (
                      <CardLoader key={Math.random().toFixed(5)} />
                    ))}
                </div>
              </Grid.Column>
            </Grid>
          </Segment.Group>
        </Grid.Row>
      ) : (
        products.length > 0 && <Books products={products} />
      )}
    </>
  );
};

export default Landing;
