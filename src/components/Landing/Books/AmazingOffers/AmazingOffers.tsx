import React from 'react';
import { Grid } from 'semantic-ui-react';

import Book from '../Book';

import { Book as BookInterface } from '../../../../pages/Store';
import useWindowResize from '../../../../custom-hooks/useWindowResize';

interface Props {
  amazingOffers: BookInterface[];
}

const AmazingOffers: React.FC<Props> = ({ amazingOffers }: Props) => {
 const {currentWidth} = useWindowResize();
  return (
    <Grid.Column width={currentWidth <= 468 ? 16: 8} className="d-flex flex-column justify-content-center books-section">
      <h3 className="Books__text-sub mt-0 text-center">Amazing Offers</h3>
      <div className="details d-flex justify-content-center align-items-center flex-wrap">
        {amazingOffers.slice(0, 4).map(book => (
          <Book key={Math.random().toFixed(5)} {...book} />
        ))}
      </div>
    </Grid.Column>
  );
};

export default AmazingOffers;
