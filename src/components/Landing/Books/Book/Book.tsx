import React from 'react';
import { Comment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import BookMock1 from '../../../../assets/images/book-mock.png';

import './Book.scss';

const Book = () => (
  <div className="Book">
    <Comment className="d-flex justify-content-between align-items-center shadow">
      <div>
        <Comment.Avatar as="a" src={BookMock1} />
      </div>
      <Comment.Content className="text-left">
        <Comment.Text className="text-bold">My new book</Comment.Text>
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
  </div>
);

export default Book;
