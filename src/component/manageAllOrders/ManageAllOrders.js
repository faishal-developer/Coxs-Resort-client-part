import React, { useEffect, useState } from 'react';
import swal from 'sweetalert'
import CalendarApp from '../Calendar/Calendar';

export const SingleOrder = (props) => {
    const { _id, name, orderedRoomImage, date, status } = props.order

    const newDate = date && new Date(date).toLocaleDateString()
    const deleteOrder = () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    props.handleDelete(_id)
                } else {
                    swal("Your imaginary file is safe!");
                }
            });
    }
    return (
        <div className="mx-auto w-75 my-5 row row-cols-1 row-cols-md-2" >
            <div className="col">
                <img className='w-75' src={orderedRoomImage} alt="name" />
            </div>
            <div className="col">
                <h3>Ordered Name: <span className='text-info'>{name}</span></h3>
                <p>Ordered Id:{_id}</p>
                <p>Date for stay: {newDate}</p>
                {
                    props.allOrder && <button onClick={() => props.approveHandler(_id)} className={`btn ${status ? 'btn-info' : 'btn-success'} mx-2`}>{status ? 'approved' : 'approve'}</button>
                }
                <button onClick={() => deleteOrder(_id)} className="btn btn-danger">Cancel</button>
            </div>
        </div>
    )
}

const ManageAllOrders = () => {
    let [orders, setOrders] = useState([])
    let [dateBasedOrder, setDateBasedOrder] = useState([])
    let [error, setError] = useState({})
    let [loadingOrder, setLoadingOrder] = useState(true)
    const [value, onChange] = useState(new Date());
    const [isAllOrder, setIsAllOrder] = useState(true)


    useEffect(() => {
        fetch(`https://frightening-skull-92151.herokuapp.com/orders`)
            .then(res => res.json())
            .then(data => {
                setOrders(data)
                setDateBasedOrder(data)
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
                setDateBasedOrder(newOrders)
                setIsAllOrder(true)
                swal("Poof! Your imaginary file has been deleted!", {
                    icon: "success",
                });
            })
    }

    const clickDayHandler = (isAll) => {
        if (isAll) {
            setIsAllOrder(true)
            setDateBasedOrder(orders)
        } else {
            setIsAllOrder(false)
            let CDate = new Date(value).toLocaleString()
            let newOrders = orders.filter((v, i) => {
                let orderDate = new Date(v.date).toLocaleString()
                return CDate === orderDate
            })
            setDateBasedOrder(newOrders)
        }
    }

    useEffect(() => {
        if (isAllOrder) return
        clickDayHandler(false)
    }, [value])


    if (loadingOrder) {
        return <div style={{ width: '60px', margin: '20vh auto' }}>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    }

    const approveHandler = (id) => {
        fetch(`https://frightening-skull-92151.herokuapp.com/orders/${id}`, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' }
        })
            .then(res => res.json())
            .then(data => {
                let newOrders = [...orders]
                let newOrder = newOrders.find(order => order._id === id);
                newOrder.status = 'okay'
                setOrders(newOrders)
                swal({
                    title: "Good job!",
                    text: "Approved successfully",
                    icon: "success",
                });
            })
            .catch(e => {
                swal({
                    title: "Error!",
                    text: e.message,
                    icon: "error",
                });
            })
    }

    return (
        <div className='container mx-auto row'>
            <div className='col-sm-12 col-lg-4 mt-5'>
                <CalendarApp value={value} onClickDay={clickDayHandler} onChange={onChange} />
            </div>
            {
                orders.length < 1 && error?.message ? (
                    <h1 className='col text-center m-5 text-danger'>{error.message ? error.message : 'No order placed Yet'} !!</h1>
                ) : (
                    <div className='col-sm-12 col-lg-8'>
                        <h2 className='text-center text-info'>
                            <span
                                onClick={() => clickDayHandler(true)}
                                className={isAllOrder ? 'btn mx-5 border-bottom' : 'btn mx-5'}>All Orders</span>
                            <span
                                onClick={() => clickDayHandler(false)}
                                className={!isAllOrder ? 'btn border-bottom' : 'btn'}
                            >{new Date(value).toLocaleDateString()}</span>
                        </h2>
                        {
                            dateBasedOrder.map(order => <SingleOrder approveHandler={approveHandler} allOrder={true} order={order} handleDelete={handleDelete} key={order._id} />)
                        }
                    </div>
                )
            }
        </div>
    );
};

export default ManageAllOrders;