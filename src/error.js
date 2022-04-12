import React from 'react';
import './error.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function Error() {
    return(
        <div className="centre">
            <div className="error-box">
                <h1 className="error-h1">ERROR: 404</h1>
                <span className="error-emoji"> 🤷🏻 </span>
                <span>ERROR</span>
                <p>Page Not Found</p>
                <Link to='/' style={{textDecoration: 'none'}}>
                    <Button sx={{color: '#5D4E99'}}>Back to Homepage 🏠</Button>
                </Link>
            </div>
        </div>

    );
}

export default Error;