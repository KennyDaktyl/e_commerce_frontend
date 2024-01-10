import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { verify } from '../actions/auth';
import { useParams } from 'react-router-dom';

const Activate = ({ verify }) => {
    const { uid, token } = useParams();
    const [verified, setVerified] = useState(false);

    const verify_account = e => {
        verify(uid, token);
        setVerified(true)
    };
    if (verified) {
        return <Navigate to='/' />
    }

    return (
        <div className='container mt-5'>
            <div className='d-flex flex-column justify-content-center align-items-center mt-5'></div>
            <h1>Weryfikacja konta</h1>
            <button 
                onClick={verify_account}
                style={{ marginTop: '50px'}}
                type='button'
                className='btn btn-primary'
            >Weryfikuj</button>

        </div>
    )
}


export default connect(null, { verify })(Activate);
