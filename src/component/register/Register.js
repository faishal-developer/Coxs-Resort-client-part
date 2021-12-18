import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { MyContext } from '../hooks/ContextApi';

const Register = () => {
    let [user, setUser] = useState({})
    const { passwordRegistration, loginWithGoogle } = useContext(MyContext)
    const history = useHistory()


    const handleChange = (e) => {
        let newUser = { ...user }
        newUser[e.target.name] = e.target.value;
        setUser(newUser)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        passwordRegistration(user.email, user.password, user.name, history)
    }
    return (
        <div className='w-50 mx-auto my-5'>
            <h2 className="text-info text-center mb-3">Please Register</h2>
            <form onSubmit={handleSubmit}>
                <div className='w-75 d-flex align-items-center justify-content-between'>
                    <label htmlFor="name">Enter Name:</label>
                    <input required onChange={handleChange} className='form-control w-75' type="text" name="name" id="name" placeholder='name...' />
                </div><br />
                <div className='w-75 d-flex align-items-center justify-content-between'>
                    <label htmlFor="email">Enter Email:</label>
                    <input required onChange={handleChange} className='form-control w-75' type="text" name="email" id="email" placeholder='email...' />
                </div><br />
                <div className='w-75 d-flex align-items-center justify-content-between'>
                    <label htmlFor="pass">Enter Password:</label>
                    <input required onChange={handleChange} className='form-control w-75' type="password" name="password" id="pass" placeholder='name...' />
                </div><br />
                <div className=''>
                    <input className='w-25 text-light btn-info btn' type="submit" value='Submit' />
                </div>
            </form>
            Already Registered ?? go to <Link to='/login'>Log In page </Link>
            <hr />
            <button onClick={loginWithGoogle} className='text-light btn-info btn'>Register with <b>GooGle</b></button>
        </div>
    );
};

export default Register;