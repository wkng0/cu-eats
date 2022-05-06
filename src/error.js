import React from 'react';
import './error.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

// PROGRAM Error404 - Program to show 404 error message and direct users to homepage
// PROGRAMMER: Tam, Lee Yau
// CALLING SEQUENCE: CALL Error()
// VERSION 1: written 13-4-2022
// REVISION 1.1: 14-4-2022 add homepage link
// PURPOSE: To handle errors when users click unexisted links or access removed contents
// DATA STRUCTURES:
//
// ALGORITHM: 
//  if the 'Back to Homepage' button is clicked, the users will be directed to homepage

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