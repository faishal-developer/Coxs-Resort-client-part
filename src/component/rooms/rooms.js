import React,{useState,useEffect} from 'react';
import SingleRoomComponent from './SingleRooms'

const Rooms = () => {
    const [rooms,setRooms] = useState([])
    const [error,setError] = useState({})
    
    useEffect(()=>{
        fetch('https://frightening-skull-92151.herokuapp.com/rooms')
            .then(res=>res.json())
            .then(data=>setRooms(data))
            .catch(e=>{
                setError({message:e.message})
                alert(e.message)
            })
    },[])
    return (
        <div className='my-5'>
            <h3 className='text-center text-info'>Rooms</h3>
            <hr className='w-25 mx-auto'/>
            {
                rooms.length<1 && error?.message ?(
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                ):(
                        <div className="row w-75 mx-auto gx-3 row-cols-md-2 row-cols-lg-3">
                    {
                        rooms.map((room,i)=>{
                            return <SingleRoomComponent
                                key = {i}
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