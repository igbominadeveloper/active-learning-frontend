import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import LocalStorage from '../../utils/localstorage';
import { logout } from '../../utils/general';

import Logo from '../../assets/images/logo.png';

import './NavBar.scss';

const NavBar: React.FC = () => {
  let user: string = LocalStorage.getItem('user');
  user = JSON.parse(user);
  
  return (
    <div className="NavBar d-flex align-items-center justify-content-between w-100 p-0">
      <Grid.Column width={8}>
        <Link to="/">
          <Image src={Logo} style={{ width: '7rem', height: '7rem' }} />
        </Link>
      </Grid.Column>
      <Grid.Column width={8} className="d-flex justify-content-end">
        <div className="links d-flex justify-content-between">
          <Link to="/" className="link">
            Home
          </Link>
          <Link to="/about" className="link">
            About
          </Link>
          <Link to="/store" className="link">
            Store
          </Link>
          {user ? (
            <Link to="#" className="link" onClick={logout}>
              Logout
            </Link>
          ) : (
            <Link to="/login" className="link">
              Login
            </Link>
          )}
        </div>
      </Grid.Column>
    </div>
  );
};
export default NavBar;
