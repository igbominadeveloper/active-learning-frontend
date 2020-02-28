import React, { useState } from 'react';
import { Grid, Image, Dropdown } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';

import { User } from '../../pages/MyProfile';
import LogoutModal from '../LogoutModal';

import LocalStorage from '../../utils/localstorage';
import { logout } from '../../utils/general';

import Logo from '../../assets/images/logo.png';

import './NavBar.scss';

const NavBar: React.FC = () => {
  const user: User = JSON.parse(LocalStorage.getItem('user'));
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

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
            <>
              <Dropdown text={user.username} pointing className="link item">
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => history.push('/my-profile')}
                    text="My Profile"
                  />
                  {user.role === 'ADMIN' && (
                    <Dropdown.Item
                      onClick={() => history.push('/admin')}
                      text="Admin Dashboard"
                    />
                  )}
                  <Dropdown.Item onClick={() => setShowModal(true)} text="Logout" />
                </Dropdown.Menu>
              </Dropdown>
            </>
          ) : (
            <Link to="/login" className="link">
              Login
            </Link>
          )}
        </div>
      </Grid.Column>
      {showModal && <LogoutModal heading="Logout" body="Are you sure you want to logout?" open={showModal} close={() => setShowModal(false)} onClick={logout} />}
    </div>
  );
};
export default NavBar;
