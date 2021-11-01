import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import SingleRoomComponent from '../rooms/SingleRooms';

const PlaceOrder = (props) => {
    let [orderdClient,setOrderdClient] = useState({})
    let [room,setRoom] = useState({})
    let {orderId} = useParams()
    let history = useHistory()

    useEffect(()=>{
        fetch(`https://frightening-skull-92151.herokuapp.com/rooms/${orderId}`)
            .then(res=>res.json())
            .then(data=>setRoom(data))
    },[])
    
    const handleChange=(e)=>{
        let newClient = {...orderdClient};
        newClient[e.target.name] = e.target.value;
        setOrderdClient(newClient)
}

    const handleSubmit=(e)=>{
        e.preventDefault();
        orderdClient.id = room._id;
        orderdClient.orderedRoomImage = room.img;
        fetch('https://frightening-skull-92151.herokuapp.com/orders',{
            method:"POST",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(orderdClient)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.insertedId){
                alert('purchased successfully');
                history.push('/myorder')
            }
        })
    }
    return (
        <div className='row w-75 gx-3 mx-auto row-cols-2'>
            <div className="col">
                <h2 className='text-info text-center'>Book Now</h2>
                <form onSubmit={handleSubmit}>
                    <label className='fw-bold text-warning' htmlFor="name">Name:</label>
                    <input onChange={handleChange} required className="form-control" type="text" name="name" id="name" placeholder='enter your name' /><br />
                    <label className='fw-bold text-warning' htmlFor="number">Number Of Person:</label>
                    <input onChange={handleChange} required className="form-control" type="number" name="numberOfPerson" id="number" placeholder='enter number of person' /><br />
                    <label className='fw-bold text-warning' htmlFor="email">email:</label>
                    <input onChange={handleChange} required className="form-control" type="email" name="email" id="email" placeholder='enter email...' /><br />
                    <label className='fw-bold text-warning' htmlFor="phone">phone:</label>
                    <input onChange={handleChange} required className="form-control" type="number" name="phone" id="phone" placeholder='enter  phone number' /><br />
                    <input type="submit" className="btn btn-info text-light fw-bold" value="Purchase Now"/>
                </form>
            </div>
            <div className="col">
                <SingleRoomComponent full={true} room={room}/>
            </div>
        </div>
    );
};

export default PlaceOrder;