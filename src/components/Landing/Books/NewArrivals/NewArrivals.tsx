import React from 'react';
import { Grid, Comment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import BookMock1 from '../../../../assets/images/book-mock.png';

const SingleBook = () => (
    <Comment className="d-flex justify-content-between align-items-center shadow">
        <div>
          <Comment.Avatar as="a" src={BookMock1} />
          <Comment.Text className="text-bold">My new book</Comment.Text>
        </div>
        <Comment.Content>
          <Comment.Author as="p" className="m-0">
            Matt Daniel
          </Comment.Author>
          <Comment.Metadata>
            <span>Today at 5:42PM</span>
          </Comment.Metadata>
          <Comment.Actions className="text-bold">
            <Link to="">
              <span>Buy now</span>
            </Link>
          </Comment.Actions>
        </Comment.Content>
      </Comment>
);

const NewArrivals = () => (
  <Grid.Column width={8} className="d-flex flex-column justify-content-center">
    <h3 className="Books__text-sub mt-0 text-center">New Arrivals</h3>
    <div className="details d-flex justify-content-between align-items-center flex-wrap">
      <SingleBook />
      <SingleBook />
      <SingleBook />
      <SingleBook />
    </div>
  </Grid.Column>
);

export default NewArrivals;
