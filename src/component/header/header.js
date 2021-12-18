import React, { useContext } from 'react';
import './header.css'
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { MyContext } from '../hooks/ContextApi';

const Header = () => {
    const { user, logOut, isLoading } = useContext(MyContext)

    const loginSection = user?.displayName ? (
        <span className="border-start mt-1">
            <small className="ps-2 text-info mx-2">{user.displayName}</small>
            <button onClick={logOut} className='btn btn-info px-2 py-0'>log out</button>
        </span>
    ) : (
        <span className='d-flex'>
            <Nav.Link as={NavLink} to='/login' className="ms-3 border-info border-start text-info fw-bold">LOG IN</Nav.Link>
            <Nav.Link as={NavLink} to='/register' className="ms-3 border-info border-start text-info fw-bold">REGISTER</Nav.Link>
        </span>
    )
    return (
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
                        {
                            user.email && (
                                <>
                                    <Nav.Link as={NavLink} to='/addnewservice' className="ms-3">ADD SERVICES</Nav.Link>
                                    <Nav.Link as={NavLink} to='/myorder' className="ms-3">BOOKED ROOMS</Nav.Link>
                                    <Nav.Link as={NavLink} to='/manageAllOrders' className="ms-3">MANAGE ORDERS</Nav.Link>
                                </>
                            )
                        }
                        {
                            isLoading ? <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div> : loginSection
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;