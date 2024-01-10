import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password } from '../actions/auth';
import { validateEmail } from '../validators';

const ResetPassword = ({ reset_password, signupError }) => {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        'email': '',
    });
    const [errorMessages, setErrorMessages] = useState({
        'email': '',
    });

    const { email } = formData;

    const onChange = e => setFormData(prevState => ({ ...prevState, [e.target.name]: e.target.value }));

    const onSubmit = e => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setErrorMessages(prevState => ({ ...prevState, 'email': 'Niepoprawny format adresu email' }));
            return;
        }
        reset_password(email);
        setRequestSent(true);
    };

    if (requestSent) {
        return <Navigate to='/' />
    }

    return (
        <div className='container mt-5'>
            <h1>Zrestetuj hasło</h1>
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
                <button className='btn btn-primary mt-2' type='submit'>Zresetuj hasło</button>
            </form>
        </div>
    )
}

export default connect(null, { reset_password })(ResetPassword);
