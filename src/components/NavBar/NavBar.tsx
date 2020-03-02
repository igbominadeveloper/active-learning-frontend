import React, { useState } from 'react';
import { Grid, Image, Dropdown, Select } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';

import { User } from '../../pages/MyProfile';
import LogoutModal from '../DecisionModal';

import LocalStorage from '../../utils/localstorage';
import { logout } from '../../utils/general';
import languages from '../../utils/languages.json';

import Logo from '../../assets/images/logo.png';

import './NavBar.scss';

const NavBar: React.FC = () => {
  const user: User = JSON.parse(LocalStorage.getItem('user'));
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  const handleLanguageChange = (event: any, data: any) => {
    window.location.href = `
      ${window.location.origin}${window.location.pathname}#googtrans(en|${data.value})`;
    window.location.reload();
  }

  return (
    <div className="NavBar w-100 d-flex flex-column">
      <div className="align-self-end">
        <label className="text-bold">Change your language</label>
        <Select options={languages} placeholder="Select a language" search onChange={handleLanguageChange}/>
      </div>
      <div className="d-flex align-items-center justify-content-between w-100 p-0">
        <Grid.Column width={8}>
          <Link to="/">
            <Image src={Logo} style={{ width: '7rem', height: '7rem' }} />
          </Link>
        </Grid.Column>
        <Grid.Column width={8} className="d-flex justify-content-end">
          <div className="links d-flex justify-content-between">
            <Link to="/" className="link text-bold">
              Home
            </Link>
            <Link to="/about" className="link text-bold">
              About
            </Link>
            <Link to="/store" className="link text-bold">
              Store
            </Link>
            {user ? (
              <>
                <Dropdown text={user.username} pointing className="link item text-bold">
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
              <Link to="/login" className="link link text-bold">
                Login
              </Link>
            )}
          </div>
        </Grid.Column>
        {showModal && <LogoutModal heading="Logout" body="Are you sure you want to logout?" open={showModal} close={() => setShowModal(false)} onClick={logout} />}
      </div>
    </div>
  );
};
export default NavBar;
