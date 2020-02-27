import React from 'react';
import { Card, Image, Icon, Segment, Feed } from 'semantic-ui-react';

import BookSmall from '../assets/images/book-mock-small.png';

import LocalStorage from '../utils/localstorage';

export interface User {
  id: string;
  email: string;
  username: string;
  phone: string;
  fullName: string;
  role: string;
}

const MyProfile: React.FC = () => {
  const user: User = JSON.parse(LocalStorage.getItem('user'));
  return (
    <div className="d-flex justify-content-between Layout__container">
      <Card className="align-self-start">
        <Card.Content>
          <Image
            floated="right"
            size="mini"
            src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
          />
          <Card.Header>{user.fullName}</Card.Header>
          <p>@{user.username}</p>
        </Card.Content>
        <Card.Content extra>
          <Card.Meta>{user.email}</Card.Meta>
          <Icon name="mobile" />
          {user.phone}
        </Card.Content>
      </Card>
      <Segment style={{ width: '70rem', marginTop: '0', marginLeft: '2rem' }}>
        <h3 className="text-left">Transaction History</h3>
        <Feed>
          {[{}, {}, {}, {}].map(() => (
            <Feed.Event key={Math.random().toFixed(5)}>
              <Feed.Label image={BookSmall} />
              <Feed.Content>
                <Feed.Date>3 days ago</Feed.Date>
                <Feed.Summary>The Mamba Mentality</Feed.Summary>
                <Feed.Extra text>Written by Kobe Bryant</Feed.Extra>
              </Feed.Content>
            </Feed.Event>
          ))}
        </Feed>
      </Segment>
    </div>
  );
};

export default MyProfile;
