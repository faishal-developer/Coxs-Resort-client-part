import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { MyContext } from '../hooks/ContextApi';

const Login = () => {
    let [user,setUser] = useState({})
    const {loginWithGoogle,loginWithPassword} = useContext(MyContext)
    

    const handleChange=(e)=>{
        let newUser = {...user}
        newUser[e.target.name] =e.target.value;
        setUser(newUser)
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        loginWithPassword(user.email,user.password)
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
            <button onClick={loginWithGoogle} className='text-light btn-info btn'>Log In with <b>GooGle</b></button>    
        </div>
    );
};

export default Login;