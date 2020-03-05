import React from 'react';

import StoreProducts from '../components/StoreProducts';

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

enum orderStatus {
  COMPLETED = 'COMPLETED',
  PENDING = 'PENDING',
  CANCELLED = 'CANCELLED',
  DECLINED = 'DECLINED',
};
export interface Order {
  id: string;
  datePlaced: string;
  user: string;
  productName: string;
  cost: number;
  status: orderStatus;
}

const Store = () => (
  <div className="Store Layout__container">
    <h2 className="text-left" style={{ marginBottom: '7rem'}}>Inventory</h2>
    <div className="d-flex flex-wrap">
      <StoreProducts />
    </div>
  </div>
);

export default Store;
