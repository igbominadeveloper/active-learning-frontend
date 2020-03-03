import React from 'react';
import { Card, Segment, Icon } from 'semantic-ui-react';
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom';

import Users from './Users';
import Products from './Products';
import Orders from './Orders';

import './Admin.scss';

const Admin: React.FC = () => {
  const match = useRouteMatch();

  return (
    <div className="d-flex justify-content-between Layout__container Admin">
      <Card className="align-self-start nav-links">
        <Card.Content>
          <Icon name="users" />
          <Link to={`${match.url}`}>Manage Users</Link>
        </Card.Content>
        <Card.Content>
          <Icon name="tag" />
          <Link to={`${match.url}/products`}>Manage Products</Link>
        </Card.Content>
        <Card.Content>
          <Icon name="cart" />
          <Link to={`${match.url}/orders`}>Manage Orders</Link>
        </Card.Content>
      </Card>
      
      <Segment className="m-0 main-content">
        <Switch>
          <Route path={`${match.url}`} exact component={Users} />
          <Route path={`${match.url}/products`} exact component={Products} />
          <Route path={`${match.url}/orders`} exact component={Orders} />
        </Switch>
      </Segment>
    </div>
  );
};

export default Admin;
