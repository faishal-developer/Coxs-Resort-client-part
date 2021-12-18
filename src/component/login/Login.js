import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { MyContext } from '../hooks/ContextApi';

const Login = () => {
    let [user, setUser] = useState({})
    const { loginWithGoogle, loginWithPassword } = useContext(MyContext)
    const history = useHistory()
    const location = useLocation()


    const handleChange = (e) => {
        let newUser = { ...user }
        newUser[e.target.name] = e.target.value;
        setUser(newUser)
    }
    const pathName = location.state.from.pathname;
    const handleSubmit = (e) => {
        e.preventDefault()
        loginWithPassword(user.email, user.password, history, pathName)
    }
    return (
        <div className='w-50 my-5 mx-auto'>
            <h2 className="text-info text-center mb-3">Please LogIn</h2>
            <form onSubmit={handleSubmit}>
                <div className='w-75 d-flex align-items-center justify-content-between'>
                    <label htmlFor="email">Enter Email:</label>
                    <input onChange={handleChange} className='form-control w-75' type="text" name="email" id="email" placeholder='email...' />
                </div><br />
                <div className='w-75 d-flex align-items-center justify-content-between'>
                    <label htmlFor="pass">Enter Password:</label>
                    <input onChange={handleChange} className='form-control w-75' type="text" name="password" id="pass" placeholder='name...' />
                </div><br />
                <div className=''>
                    <input className='w-25 text-light btn-info btn' type="submit" value='Submit' />
                </div>
            </form>
            Not Registered Yet ?? go to <Link to='register'>Register page </Link>
            <hr />
            <button onClick={() => loginWithGoogle(history, pathName)} className='text-light btn-info btn'>Log In with <b>GooGle</b></button>
        </div>
    );
};

export default Login;