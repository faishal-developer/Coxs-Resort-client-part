import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import SingleRoomComponent from '../rooms/SingleRooms';
import swal from 'sweetalert';
import { MyContext } from '../hooks/ContextApi';
import CalendarApp from '../Calendar/Calendar';

const PlaceOrder = (props) => {
    let [orderdClient, setOrderdClient] = useState({})
    const { user } = useContext(MyContext)
    const [value, onChange] = useState(new Date());
    let [room, setRoom] = useState({})
    let { orderId } = useParams()
    let history = useHistory()

    useEffect(() => {
        fetch(`https://frightening-skull-92151.herokuapp.com/rooms/${orderId}`)
            .then(res => res.json())
            .then(data => setRoom(data))
    }, [])

    const handleChange = (e) => {
        let newClient = { ...orderdClient };
        newClient[e.target.name] = e.target.value;
        setOrderdClient(newClient)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        orderdClient.date = value
        orderdClient.id = room._id;
        orderdClient.email = user.email;
        orderdClient.name = user.displayName;
        orderdClient.orderedRoomImage = room.img;
        fetch('https://frightening-skull-92151.herokuapp.com/orders', {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(orderdClient)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    swal({
                        title: "Good job!",
                        text: "Ordered successfully",
                        icon: "success",
                    });
                    history.push('/myorder')
                }
            })
    }

    const clickDayHandler = () => {
        console.log(value);
    }
    return (
        <div className='row gx-3 w-75 mx-auto row-col-lg-2'>
            <div className="col">
                <h2 className='text-info text-center'>Book Now</h2>
                <form onSubmit={handleSubmit}>
                    <p className='text-warning fw-bold mb-0'>Select Date</p>
                    <CalendarApp value={value} onClickDay={clickDayHandler} onChange={onChange} />
                    <div style={{ width: '350px' }}>
                        <label className='fw-bold text-warning' htmlFor="number">Number Of Person:</label>
                        <input onChange={handleChange} required className="form-control" type="number" name="numberOfPerson" id="number" placeholder='enter number of person' /><br />
                        <label className='fw-bold text-warning' htmlFor="phone">phone:</label>
                        <input onChange={handleChange} required className="form-control" type="number" name="phone" id="phone" placeholder='enter  phone number' />
                    </div><br />
                    <input type="submit" className="btn btn-info text-light fw-bold" value="Purchase Now" />
                </form>
            </div>
            <div className="col">
                <SingleRoomComponent full={true} room={room} />
            </div>
        </div>
    );
};

export default PlaceOrder;