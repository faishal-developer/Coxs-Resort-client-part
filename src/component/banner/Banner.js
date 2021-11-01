import React from 'react';
import { Carousel } from 'react-bootstrap';
import image1 from '../../images/banner1.jpg'
import image2 from '../../images/banner2.jpg'
import image3 from '../../images/banner3.jpg'

const Banner = () => {
    return (
        <div>
            <Carousel>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={image1}
                    alt="First slide"
                    />
                    <Carousel.Caption>
                    <h3>A great swiming pool</h3>
                    <p>A beautiful pool with natural beauty</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={image2}
                    alt="Second slide"
                    />

                    <Carousel.Caption>
                    <h3>Next label Hoisting</h3>
                    <p>take your comfort in next zone</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={image3}
                    alt="Third slide"
                    />

                    <Carousel.Caption>
                    <h3>A beautiful selfie zone</h3>
                    <p>take your selfie in next label.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
};

export default Banner;