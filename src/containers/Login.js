import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import { validateEmail } from '../validators';

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        'email': '',
        'password': ''
    });
    const [errorMessages, setErrorMessages] = useState({
        'email': '',
        'password': '',
        'account': ''
    });
    const { email, password } = formData;

    const onChange = e => {
        setFormData(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
        setErrorMessages(prevState => ({ ...prevState, [e.target.name]: '' }));
    }

    const onSubmit = async e => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setErrorMessages(prevState => ({ ...prevState, 'email': 'Niepoprawny format adresu email' }));
            return;
        }
        
        const res = await login(email, password);
        if (res && res.data) {
            if (res.data.detail) {
                setErrorMessages(prevState => ({ ...prevState, 'account': 'Niepoprawne dane logowania' }));
            } else {
                setErrorMessages(res.data);
            }
        } 
    };

    if (isAuthenticated) {
        return <Navigate to='/' />
    }

    return (
        <div className='container mt-5'>
            <h1>Logowanie</h1>
            <div className='text-danger mt-3'>{errorMessages.account}</div>
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
                    <span className='text-danger'>{errorMessages.email}</span>
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
                    <span className='text-danger'>{errorMessages.password}</span>
                </div>
                <button className='btn btn-primary mt-2' type='submit'>Zaloguj</button>
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
