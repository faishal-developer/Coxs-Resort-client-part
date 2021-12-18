import React, { useState } from 'react';
import swal from 'sweetalert'
const AddNewService = () => {
    const [service, setService] = useState({})

    const handleChange = (e, isFile = false) => {
        let newService = { ...service };

        if (isFile) {
            console.log(e.target.files[0]);
            newService[e.target.name] = e.target.files[0];
        } else {
            newService[e.target.name] = e.target.value;
        }
        setService(newService)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', 'upload')
        for (let x in service) {
            formData.append(x, service[x])
        }
        console.log(formData);
        fetch('https://frightening-skull-92151.herokuapp.com/rooms', {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    swal({
                        title: "Good job!",
                        text: "You successfully added a room service",
                        icon: "success",
                    });
                    e.target.reset()
                }
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
        <div className="w-50 my-5 mx-auto">
            <h2 className='text-info text-center'>Add A New Service</h2>
            <hr className="w-75 mx-auto" />
            <form onSubmit={handleSubmit}>
                <label className='fw-bold text-warning' htmlFor="name">Name:</label>
                <input onChange={handleChange} required className="form-control" type="text" name="name" id="name" placeholder='enter service name' /><br />
                <label className='fw-bold text-warning' htmlFor="price">Price:</label>
                <input onChange={handleChange} required className="form-control" type="number" name="price" id="price" placeholder='enter service price' /><br />
                <label className='fw-bold text-warning' htmlFor="description">Description:</label>
                <textarea onChange={handleChange} required className="form-control" type="text" name="description" id="description" placeholder='enter sort description' /><br />
                <label className='fw-bold text-warning' htmlFor="image">image:</label>
                <input onChange={(e) => handleChange(e, true)} required className="form-control" type="file" name="img" id="image" placeholder='enter  image link' /><br />
                <input type="submit" className="btn btn-info text-light fw-bold" value="Add New Service" />
            </form>
        </div>
    );
};

export default AddNewService;