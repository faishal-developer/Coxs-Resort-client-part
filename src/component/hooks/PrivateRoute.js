import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { MyContext } from './ContextApi';

const PrivateRoute = ({children,...rest}) => {
    const {user,isLoading} = useContext(MyContext)
    
    if(isLoading){
        return (
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        )
    }
    return (
        <Route
            {...rest}
            render={({ location }) =>
                user?.email ? (
                children
                ) : (
                <Redirect
                    to={{
                    pathname: "/login",
                    state: { from: location }
                    }}
                />
                )
            }
        />
    );
};

export default PrivateRoute;