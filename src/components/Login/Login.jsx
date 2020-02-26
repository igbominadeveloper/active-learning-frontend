import React from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { useHistory, Link } from 'react-router-dom';

import Logo from '../../assets/images/logo.png';

const LoginForm = () => {
  const history = useHistory();

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Image src={Logo} /> Login to your account
        </Header>
        <Form size="large">
          <Segment piled>
            <Form.Input fluid icon="user" iconPosition="left" placeholder="E-mail address" />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
            />

            <Button color="teal" fluid size="large" onClick={() => history.push('/')}>
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <Link to="/register">Sign Up</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default LoginForm;
