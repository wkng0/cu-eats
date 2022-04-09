import React from 'react';
import './error.css';
import Button from '@mui/material/Button';

function Error() {
    return(
        <div className="centre">
            <div className="error-box">
                <h1 className="error-h1">ERROR: 404</h1>
                <span className="error-emoji"> 🤷🏻 </span>
                <span>ERROR</span>
                <p>Page Not Found</p>
                <Button sx={{color: '#5D4E99'}}>Go Back to Homepage</Button>
            </div>
        </div>

    );
}

export default Error;