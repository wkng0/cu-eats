import * as React from 'react';
import logo from './image/logo.jpeg';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DoneIcon from '@mui/icons-material/Done';
// import Link from '@mui/material/Link';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
import PhoneIcon from '@mui/icons-material/Phone';
// import { useFormControl } from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import FormHelperText from '@mui/material/FormHelperText';
// import NativeSelect from '@mui/material/NativeSelect';
import{
  Link,
  Box,
  Button,
  Container,
  TextField,
  InputLabel,
  FormControl,
  Select,
  FormHelperText,
  NativeSelect,
  MenuItem,
  IconButton
} from '@mui/material';

class Profile extends React.Component{
    //get user name email and address
    render(){
        return(
            <div>
                <div class="container fluid">
                    <div class="card">
                        <div class="user text-center">
                        </div>
                        <div class="mt-5 text-center">
                            <h1 class="mb-0" style={{color: "#F4CB86"}}>User Name</h1> <span class="text-muted d-block mb-2" style={{color: "#F4CB86"}} >email</span>  <h2 class="mb-0" style={{color: '#5D4E99'}}>Points: 100</h2>
                        </div>
                        <></>
                    </div>
                </div>
                <div className="container-lg">
                    <div class="d-flex justify-content-between align-items-center mt-4 px-4">
                            <div class="stats">
                                <Link href="/profile/address" class="btn btn-lg"> <MyLocationIcon fontSize="large" sx={{color: '#5D4E99'}}/> <a >My Addreess</a></Link>
                            </div>
                            <div class="stats">
                                <Link  href="/profile/account" class="btn btn-lg"><ManageAccountsIcon fontSize="large" sx={{color: '#5D4E99'}}/>My Account ( phone password username )++change</Link>
                            </div>
                            <div class="stats">
                                <Link  href="/"class="btn btn-lg"><ReceiptLongIcon fontSize="large" sx={{color: '#5D4E99'}}/>Shopping Record</Link> 
                            </div>
                    </div>
                </div>
                <SignOut/>
            </div>
        )
    }
}

class Address extends React.Component{
    //get address

    render(){
        return(
            <>
            <Link href="/profile"><ArrowBackIcon/></Link>
            <div class="container fluid">
                    <div class="card" id="addrs">
                        <h4>Address index</h4>
                        <p>first address</p>
                    </div>
                    <div class="form">
                        Add your new address!
                        <textarea style={{width:' 100%'}}></textarea>
                        <Button variant="outlined" sx={{color: '#5D4E99' }} >Submit</Button>
                    </div>
            </div>
            </>

        )
    }
}

class Account extends React.Component{
  render(){
    return(
      <>
      <Link href="/profile"><ArrowBackIcon/></Link>
      <IconButton sx={{headerAlign: 'right'}}><DoneIcon/></IconButton>
      <Info/>
      <ChooseGender/>
      <ChooseCollege/>
      <ChooseFaculty/>
      <Button variant="outlined" sx={{color: '#5D4E99', m: 8 }} >Change Password</Button>
      </>
    )
  }
}

class Info extends React.Component{

    render(){
        return(
            <>
            <Box component="form"
            sx={{
                '& .MuiTextField-root': { m: 8, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            >
      <div>
        <TextField
          required
          id="standard-required"
          label="User name"
          defaultValue="user_name"
          variant="standard"
        />
        <TextField
          required
          id="standard-required"
          label="Phone"
          defaultValue="user_phone"
          variant="standard"
        />
        {/* <TextField
          disabled
          id="standard-disabled"
          label="Disabled"
          defaultValue="Hello World"
          variant="standard"
        />
        <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="standard"
        /> */}
        <TextField
          id="standard-read-only-input"
          label="Read Only Your email"
          defaultValue="user_email"
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
        />
        {/* <TextField
          id="standard-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
        />

        <TextField
          id="standard-search"
          label="Search field"
          type="search"
          variant="standard"
        />
        <TextField
          id="standard-helperText"
          label="Helper text"
          defaultValue="Default Value"
          helperText="Some important text"
          variant="standard"
        /> */}
      </div>
    </Box>
    {/* <SelectLabels/> */}
            </>
            )
    }
}


function ChooseGender() {
  return (
    <Box sx={{ m:8 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Gender
        </InputLabel>
        <NativeSelect
          defaultValue={30}
          inputProps={{
            name: 'age',
            id: 'uncontrolled-native',
          }}
        >
          <option>None</option>
          <option>Female</option>
          <option>Male</option>
          <option>Others</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
}

function ChooseCollege() {
  return (
    <Box sx={{ m: 8 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          College
        </InputLabel>
        <NativeSelect
          defaultValue={30}
          inputProps={{
            name: 'age',
            id: 'uncontrolled-native',
          }}
        >
          <option>None</option>
          <option>CC</option>
          <option>CW</option>
          <option>MS</option>
          <option>NA</option>
          <option>SHAW</option>
          <option>WS</option>
          <option>WYS</option>
          <option>SH</option>
          <option>UC</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
}


function ChooseFaculty() {
  return (
    <Box sx={{ m: 8 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Faculty
        </InputLabel>
        <NativeSelect
          defaultValue={30}
          inputProps={{
            name: 'age',
            id: 'uncontrolled-native',
          }}
        >
          <option>None</option>
          <option>Arts</option>
          <option>Business Administration</option>
          <option>Education</option>
          <option>Engineering</option>
          <option>Law</option>
          <option>Medicine</option>
          <option>Science</option>
          <option>Social Science</option>
          <option>Others</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
}





class SignOut extends React.Component{
    out(){
        return 1;
    }
    render(){
        return(
            <>
            <Button variant="outlined" sx={{color: '#5D4E99', m: 8, zIndex: 'tooltip' }} >Sign out</Button>
            </>
        )
    }
}
export {Profile, Account, Address};