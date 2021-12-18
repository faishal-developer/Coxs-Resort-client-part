import React, { useState, useEffect } from 'react';
import SingleRoomComponent from './SingleRooms'
import swal from 'sweetalert';

const Rooms = (props) => {
    const [rooms, setRooms] = useState([])
    const [error, setError] = useState({})
    const [loadingData, setLoadingData] = useState(true)

    useEffect(() => {
        fetch('https://frightening-skull-92151.herokuapp.com/rooms')
            .then(res => res.json())
            .then(data => {
                setLoadingData(false)
                setRooms(data)
            })
            .catch(e => {
                setLoadingData(false)
                setError({ message: e.message })
                swal({
                    title: "Error!",
                    text: e.message,
                    icon: "error",
                });
            })
    }, [])

    if (loadingData) {
        return <div style={{ width: '60px', margin: '5px auto' }}>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    }
    return (
        <div className='my-5'>
            <h3 className='text-center text-info'>Rooms</h3>
            <hr className='w-25 mx-auto' />
            {
                rooms.length < 1 && error?.message ? (
                    <div><h1 className='text-center text-danger'>{error.message}!!</h1></div>
                ) : (
                    <div className="row w-75 mx-auto gx-1 row-cols-md-2 row-cols-lg-3">
                        {
                            rooms.map((room, i) => {
                                return props.room ? (
                                    i <= 5 && <SingleRoomComponent key={i} room={room} />
                                ) : <SingleRoomComponent
                                    key={i}
                                    room={room}
                                />
                            })
                        }
                    </div>
                )
            }
        </div>
    );
};

export default Rooms;