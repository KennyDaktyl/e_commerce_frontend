import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password_confirm } from '../actions/auth';
import { useParams } from 'react-router-dom';

const ResetPasswordConfirm = ({ reset_password_confirm }) => {
    const { uid, token } = useParams();
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        'new_password': '',
        're_new_password': '',
    });

    const { new_password, re_new_password } = formData;

    const onChange = e => setFormData(prevState => ({ ...prevState, [e.target.name]: e.target.value }));

    const onSubmit = e => {
        e.preventDefault();

        reset_password_confirm(uid, token, new_password, re_new_password);
        setRequestSent(true);
    };

    if (requestSent) {
        return <Navigate to='/' />
    }

    return (
        <div className='container mt-5'>
            <h1>Podaj nowe hasło</h1>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group mt-4'>
                    <input 
                        className='form-control'
                        type='password'
                        placeholder='New password'
                        name='new_password'
                        value={new_password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>
                <div className='form-group mt-4'>
                    <input 
                        className='form-control'
                        type='password'
                        placeholder='Re new password'
                        name='re_new_password'
                        value={re_new_password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>
                <button className='btn btn-primary mt-2' type='submit'>Zresetuj hasło</button>
            </form>
        </div>
    )
}

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);
