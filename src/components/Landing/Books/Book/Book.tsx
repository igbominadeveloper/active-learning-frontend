import React from 'react';
import { Comment, Placeholder, Button } from 'semantic-ui-react';

import { Book as BookInterface } from '../../../../pages/Store';
import { defaultCover } from '../../../../utils/general';

import './Book.scss';

const Book: React.FC<BookInterface> = (props: BookInterface) => (
  <div className="Book">
    <Comment className="d-flex justify-content-between align-items-center shadow">
      <div>
        <Comment.Avatar as="a" src={props.cover || defaultCover} />
      </div>
      <Comment.Content className="text-left">
        <Comment.Text className="text-bold">{props.name}</Comment.Text>
        <Comment.Author as="p" className="m-0">
          {props.author}
        </Comment.Author>
        <Comment.Metadata>
          <span>{props.publishedAt}</span>
        </Comment.Metadata>
        <Comment.Actions className="text-bold">
          <Button color="teal" size="tiny">Buy Now</Button>
        </Comment.Actions>
      </Comment.Content>
    </Comment>
  </div>
);

export const BookLoader = () => (
  <div className="Book">
    <Comment className="d-flex justify-content-between align-items-center shadow">
      <Placeholder fluid>
        <Placeholder.Line length="full" />
      </Placeholder>
      <Comment.Content className="text-left">
        <Comment.Text className="text-bold">
          <Placeholder fluid>
            <Placeholder.Line length="full" />
          </Placeholder>
        </Comment.Text>
        <Comment.Author as="p" className="m-0">
          <Placeholder fluid>
            <Placeholder.Line length="full" />
          </Placeholder>
        </Comment.Author>
        <Comment.Metadata>
          <Placeholder fluid>
            <Placeholder.Line length="full" />
          </Placeholder>
        </Comment.Metadata>
        <Comment.Actions className="text-bold">
          <Placeholder fluid>
            <Placeholder.Line length="full" />
          </Placeholder>
        </Comment.Actions>
      </Comment.Content>
    </Comment>
  </div>
);

export default Book;
