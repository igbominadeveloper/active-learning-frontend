import React, { useState, useEffect } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment, Icon } from 'semantic-ui-react';
import { useHistory, Link } from 'react-router-dom';

import Logo from '../../assets/images/logo.png';

import './Register.scss';

interface IProps {
  registerAction: Function;
  loading: boolean;
  error: any;
}

const RegisterForm: React.FC<IProps> = ({ registerAction, loading, error }) => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUserName] = useState('');
  const [formHasErrors, setFormHasErrors] = useState(true);

  useEffect(() => {
    const fields: string[] = [email, password, fullName, phone, username];
    fields.forEach(field => {
      if (field.length < 1) setFormHasErrors(true);
      else setFormHasErrors(false);
    });
  }, [email, password, fullName, phone, username]);

  const toggleVisible = ():void => setShowPassword(!showPassword);

  return (
    <Grid
      textAlign="center"
      style={{ height: '100vh' }}
      verticalAlign="middle"
      className="RegisterForm"
    >
      <Grid.Column style={{ maxWidth: 550 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Image src={Logo} /> Create your account
        </Header>
        <Form
          size="large"
          onSubmit={() => registerAction({ email, password, phone, fullName, username }, history)}
        >
          <Segment piled>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
              value={email}
              type="email"
              onChange={event => setEmail(event.target.value)}
              required
            />
            <Form.Input
              fluid
              icon="address card"
              iconPosition="left"
              placeholder="FullName"
              type="text"
              value={fullName}
              onChange={event => setFullName(event.target.value)}
              required
            />
            <Form.Input
              fluid
              icon="user secret"
              iconPosition="left"
              placeholder="Username"
              type="text"
              value={username}
              onChange={event => setUserName(event.target.value)}
              required
            />

            <Form.Group inline widths="equal">
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

            <div onClick={toggleVisible} className="RegisterForm__showOrHidePassword">
                  {showPassword ? <i className="eye slash icon tbh" /> : <i className="eye icon tbh" />}
                </div>

              <Form.Input
                fluid
                icon="mobile"
                iconPosition="left"
                placeholder="Phone Number"
                type="text"
                value={phone}
                onChange={event => setPhone(event.target.value)}
                required
              />
            </Form.Group>
            <Button
              color="teal"
              fluid
              size="large"
              type="submit"
              loading={loading}
              disabled={formHasErrors}
            >
              Save
            </Button>
          </Segment>
        </Form>

        {error && <Message error content={error} />}
        <Message className="d-flex justify-content-between" style={{ padding: '1rem 5rem' }}>
          <Link to="/">
            <Icon name="reply" />
            Back Home
          </Link>
          <span>
            Have an account? <Link to="/login">Login</Link>
          </span>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default RegisterForm;
