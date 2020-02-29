import React from 'react';

import Product from '../components/Landing/Books/Book';

export interface Book {
  id: string;
  name: string;
  publishedAt: string;
  author: string;
  description: string;
  specialOffer: boolean;
  cover: string;
  language: string;
}

export interface Order {
  id: string;
  datePlaced: string;
  user: string;
  productName: string;
}

const Store = () => (
  <div className="Store Layout__container">
    <h2 className="text-left">Inventory</h2>
    <div className="d-flex flex-wrap">
      {[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}].map(() => (
        <Product key={Math.random()} />
      ))}
    </div>
  </div>
);

export default Store;
