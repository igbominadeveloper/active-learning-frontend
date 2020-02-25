import React from 'react';
import { Segment, Grid, Image } from 'semantic-ui-react';

import HeroIllustration from '../../../assets/images/cart.svg';

import './Hero.scss';


const Hero = () => (
    <Grid.Row className="Hero text-left">
        <Segment.Group horizontal className="w-100 Hero__segments">
            <Grid columns={16} className="w-100 m-0">
                <Grid.Column width={6} className="d-flex flex-column justify-content-center">
                    <h2 className="Hero__text-main">Online Store</h2>
                    <h3 className="Hero__text-sub mt-0">You can find any book here</h3>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia neque odit ducimus fugiat doloremque cupiditate provident. Corrupti nulla possimus consectetur eaque veritatis numquam blanditiis deleniti. Porro repudiandae doloribus odio laudantium?</p>                   
                </Grid.Column>
                <Grid.Column width={10}>
                    <Image src={HeroIllustration} height="90%" width="90%" />
                </Grid.Column>
            </Grid>
        </Segment.Group>
    </Grid.Row>
);

export default Hero;
