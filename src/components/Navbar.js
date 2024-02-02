import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';  
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout, checkAuthenticated } from '../actions/auth';


const Navbar = ({ logout, isAuthenticated }) => {
    const [authReady, setAuthReady] = useState(false);
    const [menuItems, setMenuItems] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const checkAuth = async () => {
            await dispatch(checkAuthenticated());
            setAuthReady(true);
        };

        checkAuth();
    }, [dispatch]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/main-menu-items/`);
                const data = await response.json();
                setMenuItems(data);
            } catch (error) {
                console.error('Error fetching menu items data:', error);
            }
        };
        fetchData();
    }, []);

    const questLinks = () => (
        <Fragment>
            <li className="nav-item">
                <Link className='nav-link ms-auto' to='/login/'>Zaloguj</Link>
            </li>
        </Fragment>
    );

    const authLinks = () => (
        <Fragment>
            <li className="nav-item">
                <Link className='nav-link ms-auto' to='/' onClick={logout}>Wyloguj</Link>
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
                            {menuItems && menuItems.map((menuItem) => (
                                <li key={menuItem.id} className="nav-item">
                                    <Link className="nav-link" to={`/${menuItem.slug}/`}>
                                        {menuItem.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { logout })(Navbar);
