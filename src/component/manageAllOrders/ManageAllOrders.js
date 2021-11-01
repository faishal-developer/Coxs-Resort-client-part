import React, {  useEffect, useState } from 'react';

export const SingleOrder=(props)=>{
   const {_id,name,orderedRoomImage} = props.order
   
   
    return (
        <div className="w-50 mx-auto row row-cols-2">
            <div className="col">
                <img className="w-100" src={orderedRoomImage} alt="name" />
            </div>
            <div className="col">
                <h3>Ordered Name: <span className='text-info'>{name}</span></h3>
                <p>Ordered Id:{_id}</p>
                <button className="btn btn-success mx-2">approve</button>
                <button onClick={()=>props.handleDelete(_id)} className="btn btn-danger">delete</button>
            </div>
        </div>
    )
}

const ManageAllOrders = () => {
    let [orders,setOrders] = useState([])
    let [error,setError] =useState({})

    useEffect(()=>{
        fetch(`https://frightening-skull-92151.herokuapp.com/orders`)
            .then(res=>res.json())
            .then(data=>setOrders(data))
            .catch(e=>{
                setError({message:e.message})
                alert(e.message)
            })
    },[])

    const handleDelete=(id)=>{
        let confirm = window.confirm('are you sure to delete these item')
        if(confirm){
            console.log(`https://frightening-skull-92151.herokuapp.com/orders/${id}`);
         fetch(`https://frightening-skull-92151.herokuapp.com/orders/${id}`,{
             method:'DELETE',
             headers:{'Content-type':'application/json'}
         })
         .then(res=>res.json())
         .then(data=>{
             let newOrders = orders.filter(order=>order._id !== id);
             setOrders(newOrders)
             alert('deleted successfully')
         })
        }
    }

    
    return (
        <div>
            {
                orders.length<1 && error?.message ?(
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                ):(
                    <div>
                        {
                            orders.map(order=><SingleOrder order={order} handleDelete={handleDelete} key={order._id}/>)
                        }
                    </div>
                )
            }
        </div>
    );
};

export default ManageAllOrders;