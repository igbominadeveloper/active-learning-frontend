import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import './NavBar.scss';

import Logo from '../../assets/images/logo.png';

const NavBar = () => (
    <div className="NavBar d-flex align-items-center justify-content-between w-100">
        <Grid.Column width={8}>
        <Image src={Logo} style={{ width: '7rem', height: '7rem' }} />
        </Grid.Column>
        <Grid.Column width={8} className="d-flex justify-content-end">
            <div className="links d-flex justify-content-between">
                <Link to="/" className="link">Home</Link>
                <Link to="/about" className="link">About</Link>
                <Link to="/store" className="link">Store</Link>
                <Link to="/login" className="link">Login</Link>
            </div>
        </Grid.Column>
    </div>
    );

export default NavBar;
