import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from '../hooks/ContextApi';
import { SingleOrder } from '../manageAllOrders/ManageAllOrders';
import swal from 'sweetalert'

const MyOrders = () => {
    let { user } = useContext(MyContext)
    let [orders, setOrders] = useState([])
    let [error, setError] = useState({})
    let [loadingOrder, setLoadingOrder] = useState(true)

    useEffect(() => {
        fetch(`https://frightening-skull-92151.herokuapp.com/orders/${user.email}`)
            .then(res => res.json())
            .then(data => {
                setOrders(data)
                setLoadingOrder(false)
            })
            .catch(e => {
                setError({ message: e.message })
                setLoadingOrder(false)
                swal({
                    title: "Error!",
                    text: e.message,
                    icon: "error",
                });
            })
    }, [])

    const handleDelete = (id) => {
        fetch(`https://frightening-skull-92151.herokuapp.com/orders/${id}`, {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json' }
        })
            .then(res => res.json())
            .then(data => {
                let newOrders = orders.filter(order => order._id !== id);
                setOrders(newOrders)
                swal("Poof! Your imaginary file has been deleted!", {
                    icon: "success",
                });
            })
    }

    if (loadingOrder) {
        return <div style={{ width: '60px', margin: '20vh auto' }}>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    }
    return (
        <div>
            {
                orders.length < 1 && error?.message ? (
                    <h1 className='text-center m-5 text-danger'>{error.message ? error.message : 'No order placed Yet'} !!</h1>
                ) : (
                    <div>
                        {
                            orders.map(order => <SingleOrder handleDelete={handleDelete} order={order} handleDelete={() => console.log('working')} key={order._id} />)

                        }
                    </div>
                )
            }
        </div>
    );
};

export default MyOrders;