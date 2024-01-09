import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

const Navbar = ({ logout, isAuthenticated }) => {
    const questLinks = () => (
        <Fragment>
            <li className='nav-item'>
                <Link className='nav-link' to='/login'>Zaloguj</Link>
            </li>
            <li className='nav-item'>
                <Link className='nav-link' to='/signin'>Zarejestruj</Link>
            </li>
        </Fragment>
    );

    const authLinks = () => (
        <Fragment>
            <li className='nav-item'>
                <Link className='nav-link' href='#!' onClick={logout}>Wyloguj</Link>
            </li>
        </Fragment>
    );

    return (
        <div className='container-fluid'>
            <nav className='navbar navbar-expand-lg bg-body-tertiary'>
                <div className='container'>
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
                    <div className='collapse navbar-collapse' id='navbarNav'>
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className='nav-item'>
                                <Link className='nav-link active' aria-current='page' to='/'>Home</Link>
                            </li>
                            {isAuthenticated ? authLinks() : questLinks()}
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
