import React from 'react';

import Book from '../components/Landing/Books/Book';

export interface Book {
    id: string;
    name: string;
    publishedAt: string;
    author: string;
    description: string;
    specialOffer: string;
    cover: string;
    language: string;
}

const Store = () => (
    <div className="Store Layout__container">
        <h2 className="text-left">Inventory</h2>
        <div className="d-flex flex-wrap">
            <Book />
            <Book />
            <Book />
            <Book />
            <Book />
            <Book />
            <Book />
            <Book />
            <Book />
            <Book />
            <Book />
            <Book />
            <Book />
            <Book />
            <Book />
            <Book />
            <Book />
            <Book />
            <Book />
            <Book />
            <Book />
        </div>
    </div>
);

export default Store;
