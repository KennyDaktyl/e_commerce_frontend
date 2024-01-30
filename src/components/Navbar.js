import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';  
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout, checkAuthenticated } from '../actions/auth';

const Navbar = ({ logout, isAuthenticated }) => {
    const [authReady, setAuthReady] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const checkAuth = async () => {
            await dispatch(checkAuthenticated());
            setAuthReady(true);
        };

        checkAuth()
    }, [dispatch]);

    const questLinks = () => (
        <Fragment>
                <Link to='/login'>Zaloguj</Link>
        </Fragment>
    );

    const authLinks = () => (
            <Fragment>
                <li className="nav-item">
                    <Link className='nav-link ms-auto' href='#!' onClick={logout}>Wyloguj</Link>
                </li>
            </Fragment>
    ); 

    return (
        <div className='container-fluid'>
            <div className='header-top-bar container d-flex justify-content-end align-items-center'>
                    {authReady && (isAuthenticated ? authLinks() : questLinks())}
            </div>
            <nav className='navbar navbar-expand-lg navbar-light bg-body-tertiary'>
                <div className='container '>
                    <Link className='navbar-brand' to='/'>Navbar</Link>
                    <button 
                        className='navbar-toggler'
                        type='button'
                        data-bs-toggle='collapse'
                        data-bs-target='#navbarNav'
                        aria-controls='navbarNav'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                    >
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className='collapse navbar-collapse row' id='navbarNav'>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 container ml-auto">
                            <li key="1" className="nav-item">
                                <Link className="nav-link" to='/naprawy-telefonow'>
                                    Naprawy telefonów
                                </Link>
                            </li>
                            <li key="2" className="nav-item">
                                <Link className="nav-link" to='/pieczatki'>
                                    Pieczątki
                                </Link>
                            </li>
                            <li key="3" className="nav-item">
                                <Link className="nav-link" to='/dorabianie-kluczy'>
                                    Dorabianie kluczy
                                </Link>
                            </li>
                            <li key="4" className="nav-item">
                                <Link className="nav-link" to='/grawerowanie'>
                                    Grawerowanie
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

const mapsStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})
 
export default  connect(mapsStateToProps, { logout })(Navbar);