import React, { useContext } from 'react';
import './header.css'
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { MyContext } from '../hooks/ContextApi';

const Header = () => {
    const {user,logOut,isLoading} = useContext(MyContext)

    if(isLoading){
        return <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
    }
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="#home">Cox-Resort</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>
                        <Nav.Link as={NavLink} to='/home' className="ms-3">HOME</Nav.Link>
                        <Nav.Link as={NavLink} to='/rooms' className="ms-3">ROOMS</Nav.Link>
                        <Nav.Link as={NavLink} to='/addnewservice'  className="ms-3">Add New Service</Nav.Link>
                        <Nav.Link as={NavLink} to='/myorder' className="ms-3">MY BOOKED ROOMS</Nav.Link>
                        <Nav.Link as={NavLink} to='/manageAllOrders' className="ms-3">MANAGE ALL ORDERS</Nav.Link>
                        {
                            user?.displayName ? (
                                <span className="border-start">
                                    <small className="ps-2 text-info">{user.displayName}</small>
                                    <button onClick={logOut} className='btn btn-info'>log out</button>
                                </span>
                            ) : (
                                <span className='d-flex'>
                                    <Nav.Link as={NavLink} to='/login' className="ms-3 border-info border-start text-info fw-bold">LOG IN</Nav.Link>
                                    <Nav.Link as={NavLink} to='/register' className="ms-3 border-info border-start text-info fw-bold">REGISTER</Nav.Link>
                                </span>
                            )
                        }
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;