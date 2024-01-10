import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../actions/auth';
import { validateEmail } from '../validators';

const Signup = ({ signup, isAuthenticated, signupError }) => {
    const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setFormData] = useState({
        'email': '',
        'password': '',
        're_password': '',
        'first_name': '',
        'last_name': ''
    });
    const [errorMessages, setErrorMessages] = useState({
        'email': '',
        'password': '',
        're_password': '',
        'first_name': '',
        'last_name': '',
        'details': ''
    });

    const { email, password, re_password, first_name, last_name } = formData;

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

        if (password !== re_password) {
            setErrorMessages(prevState => ({ ...prevState, 're_password': 'Hasła muszą być identyczne' }));
            return;
        }

        const res = await signup(email, password, re_password, first_name, last_name);
        if (res && res.data) {
            if (res.data.email) {
                setErrorMessages(prevState => ({ ...prevState, 'email': res.data.email }));
            }
            if (res.data.password) {
                setErrorMessages(prevState => ({ ...prevState, 'password': res.data.password }));
            }
            if (res.data.details) {
                setFormData(prevState => ({ ...prevState, 'details': res.data.details }));
            }
            if (!res.data.email && !res.data.password && !res.data.details) {
                setAccountCreated(true);
            }
        } else {
            setAccountCreated(true);
        }
    };

    if (isAuthenticated) {
        return <Navigate to='/' />
    }
    if (accountCreated) {
        return <Navigate to='/login' />
    }

    return (
        <div className='container mt-5'>
            <h1>Rejestracja</h1>
            <p>Podaj dane do rejestracji</p>
            <div className='text-danger mt-3'>{errorMessages.details}</div>
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
                        minLength='8'
                        required
                    />
                    <span className='text-danger'>{errorMessages.password}</span>
                </div>
                <div className='form-group mt-4'>
                    <input 
                        className='form-control'
                        type='password'
                        placeholder='Re password'
                        name='re_password'
                        value={re_password}
                        onChange={e => onChange(e)}
                        minLength='8'
                        required
                    />
                    <span className='text-danger'>{errorMessages.re_password}</span>
                </div>
                <div className='form-group mt-4'>
                    <input 
                        className='form-control'
                        type='text'
                        placeholder='First name'
                        name='first_name'
                        value={first_name}
                        onChange={e => onChange(e)}
                        minLength='2'
                        required
                    />
                    <span className='text-danger'>{errorMessages.first_name}</span>
                </div>
                <div className='form-group mt-4'>
                    <input 
                        className='form-control'
                        type='text'
                        placeholder='Last name'
                        name='last_name'
                        value={last_name}
                        onChange={e => onChange(e)}
                        minLength='2'
                        required
                    />
                    <span className='text-danger'>{errorMessages.last_name}</span>
                </div>
                <button className='btn btn-primary mt-2' type='submit'>Zarejestruj</button>
            </form>
            <p className='mt-3'>
                Posiadasz już konto? <Link to='/login'>Zaloguj</Link>
            </p>
        </div>
    )
}

const mapStateToProps = state => ({
     isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { signup })(Signup);
