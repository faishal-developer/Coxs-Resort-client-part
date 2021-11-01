import React from 'react';

const Footer = () => {
    const style={color:'#888'}
    return (
        <div className='d-flex align-items-center p-4 text-light bg-dark justify-content-between'>
            <div>
                <p style={style} className='fs-6 fw-lighter'>resort theme by mohammed faishal</p>
            </div>
            <div>
                <p style={style} className='fs-6 fw-lighter'>&copy;copyrights 2021 deserves </p>
            </div>
        </div>
    );
};

export default Footer;