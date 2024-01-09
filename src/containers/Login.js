import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

import { login } from '../actions/auth';

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        'email': '',
        'password': ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData(prevState => ({ ...prevState, [e.target.name]: e.target.value }));

    const onSubmit = e => {
        e.preventDefault();
        login(email, password)
    };

    if (isAuthenticated) {
        return <Navigate to='/' />
    }

    return (
        <div className='container mt-5'>
            <h1>Rejestracja</h1>
            <p>Podaj dane do założenia konta</p>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input 
                        className='form-control'
                        type='email'
                        placeholder='email'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group mt-4'>
                    <input 
                        className='form-control'
                        type='password'
                        placeholder='password'
                        name='password'
                        value={password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>
                <button className='btn btn-primary mt-2' type='submiy'>Zaloguj</button>
            </form>
            <p className='mt-3'>
                Nie masz konta? <Link to='/signup'>Rejestracja</Link>
            </p>
            <p className='mt-3'>
                Zapomiałeś hasła? <Link to='/reset-password'>Przypomnij hasło</Link>
            </p>
        </div>
    )
}

const mapStateToProps = state => ({
     isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);
