import React from 'react';
import galarie1 from '../../images/galaries/galarie1.jpg'
import galarie2 from '../../images/galaries/galarie2.jpg'
import galarie3 from '../../images/galaries/galarie3.jpg'
import galarie4 from '../../images/galaries/galarie4.jpg'
import galarie5 from '../../images/galaries/galarie5.jpg'
import galarie6 from '../../images/galaries/galarie6.jpg'
import galarie7 from '../../images/galaries/galarie7.jpg'
import galarie8 from '../../images/galaries/galarie8.jpg'
import galarie9 from '../../images/galaries/galarie9.jpg'

const Galaries = () => {
    return (
        <div className='row g-0 w-75 mx-auto row-cols-md-2 row-cols-lg-3'>
            <img className="col" src={galarie1} alt="" />
            <img className="col" src={galarie2} alt="" />
            <img className="col" src={galarie3} alt="" />
            <img className="col" src={galarie4} alt="" />
            <img className="col" src={galarie5} alt="" />
            <img className="col" src={galarie6} alt="" />
            <img className="col" src={galarie7} alt="" />
            <img className="col" src={galarie8} alt="" />
            <img className="col" src={galarie9} alt="" />
        </div>
    );
};

export default Galaries;