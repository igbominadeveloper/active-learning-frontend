import React, { useState, useEffect } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment, Icon } from 'semantic-ui-react';
import { useHistory, Link } from 'react-router-dom';

import Logo from '../../assets/images/logo.png';

import './Login.scss';

interface IProps {
  loginAction: Function;
  loading: boolean;
  error: any;
}

const LoginForm: React.FC<IProps> = ({ loginAction, loading, error }) => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formHasErrors, setFormHasErrors] = useState(true);
  const [showPassword, setShowPassword]  = useState(false);

  useEffect(() => {
    if (email.length < 1 || password.length < 1) {
      setFormHasErrors(true);
    } else {
      setFormHasErrors(false);
    }
  }, [email, password]);

  const toggleVisible = ():void => setShowPassword(!showPassword);

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Image src={Logo} /> Login to your account
        </Header>
        <Form size="large" onSubmit={() => loginAction({ email, password }, history)}>
          <Segment piled>
            <Form.Input
              fluid
              icon="mail"
              iconPosition="left"
              placeholder="E-mail address"
              value={email}
              type="email"
              onChange={event => setEmail(event.target.value)}
              required
            />
            <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                value={password}
                type={showPassword ? 'text' : 'password'}
                onChange={event => setPassword(event.target.value)}
                required
              />

            <div onClick={toggleVisible} className="LoginForm__showOrHidePassword">
                  {showPassword ? <i className="eye slash icon tbh" /> : <i className="eye icon tbh" />}
                </div>

            <Button
              color="teal"
              fluid
              size="large"
              type="submit"
              loading={loading}
              disabled={formHasErrors}
            >
              Login
            </Button>
          </Segment>
        </Form>

        {error && (
          <Message
            error
            content={error}
          />
        )}
        <Message className="d-flex justify-content-between" style={{ padding: '1rem 5rem'}}>
          <Link to="/"><Icon name="reply" />Back Home</Link>
          <span>New to us? <Link to="/register">Sign Up</Link></span>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default LoginForm;
