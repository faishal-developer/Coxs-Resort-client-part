import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from '../hooks/ContextApi';
import { SingleOrder } from '../manageAllOrders/ManageAllOrders';

const MyOrders = () => {
    let {user} = useContext(MyContext)
    let [orders,setOrders]=useState([])
    let [error,setError] =useState({})

    useEffect(()=>{
        fetch(`https://frightening-skull-92151.herokuapp.com/orders/${user.email}`)
          .then(res=>res.json())
          .then(data=>setOrders(data))
          .catch(e=>{
            setError({message:e.message})
            alert(e.message)
        })
    },[])

    
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
                            orders.map(order=><SingleOrder order={order} handleDelete={()=>console.log('working')} key={order._id}/>)

                        }
                    </div>
                )
            }
        </div>
    );
};

export default MyOrders;