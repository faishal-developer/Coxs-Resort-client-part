import React from 'react';
import { Link } from 'react-router-dom';
import './rooms.css'

const SingleRoomComponent = (props) => {
    const {name,price,description,img,_id} =props.room

    return (
        <div className='col'>
            <div className="p-3 m-3 singleRoom">
                <div >
                    <img className='w-100' src={img} alt={name} />
                </div>
                <div>
                    <h3 className="text-info">{name}</h3>
                    <p>{props.full ? description : description?.slice(0,90)}...</p>
                    <h4 className='text-warning'>{price}</h4>
                    {
                        !props.full && (
                        <Link to={`/placeorder/${_id}`}>
                            <button className='btn btn-info text-light w-50'>Book Now</button>
                        </Link>
                        ) 
                    }
                </div>
            </div>
        </div>
    );
};

export default SingleRoomComponent;