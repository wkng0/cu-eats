import React, {useEffect, useState} from 'react';
import logo from './image/logo.jpeg';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DoneIcon from '@mui/icons-material/Done';
import PhoneIcon from '@mui/icons-material/Phone';
import{
  Link,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  InputLabel,
  FormControl,
  Select,
  FormHelperText,
  NativeSelect,
  MenuItem,
  IconButton,
  Avatar,
} from '@mui/material';

let userInfo = [];

// class Profile extends React.Component{
//     //get user name email and address
//     constructor(){
//       super();
//       this.state={
//       login: true,
//       username:'',
//       point:-1,
//       email:'csci3100.d2@group.cuhk.edu.hk',
//       fname:'',
//       lname:'',
//       phone:'',
//       college:'',
//       faculty:'',
//       gender:'',
//       pic:'',
//       fetchFinish: false,
//   };}

//    async getInfo(){
//      return fetch('http://localhost:7000/dbAccount/get/'+this.state.email)
//      .then(res=>res.json())
//      .then(data=>{
//        console.log(data[0]);
//       //  this.setState({email: data[0].email});
//        this.setState({username: data[0].user_name});
//       //  console.log(this.state.user_name);
//        this.setState({point: data[0].point});
//        userInfo = data[0];
//        console.log(userInfo);
//       //  this.setState({fname: data[0].fname});
//       //  this.setState({lname: data[0].lname});
//       //  this.setState({phone: data[0].phone});
//       //  this.setState({faculty: data[0].faculty});
//       //  this.setState({gender: data[0].gender});
//       //  this.setState({college: data[0].college});
//       //  this.setState({pic: data[0].pic})
//        // this.setState({email: data[0].email});
//      })
//      .catch((err)=>{console.log(err)});
//    }

//   componentWillMount(){
//     this.getInfo()
//     .then(()=>{
//       console.log("un",this.state.username);
//       console.log("pt",this.state.point);
//       this.setState({fetchFinish: true})
//     })
//     .catch(err=>{
//       console.log(err);
//       this.setState({fetchFinish: false});
//     })
//   }

//     render(){
//       if (this.state.fetchFinish===true){
//       return(
//         <ProfileHeader username={this.state.username} point={this.state.point} email={this.state.email} 
//         fname={this.state.fname} lname={this.state.lname} phone={this.state.phone} gender={this.state.gender}
//         faculty={this.state.faculty} college={this.state.college} pic={this.state.pic}/>
//       )
//     }
//   }
// }

function Profile(){
  const[username,setUsername] = useState('');
  const[email,setEmail] = useState('0.0@link.cuhk.edu.hk');
  const[point,setPoint] = useState(-1);

  useEffect(()=>{
    fetch('http://localhost:7000/dbAccount/get/'+email)
    .then(res=>res.json())
    .then(data=>{
        console.log(data[0]);
        setUsername(data[0].user_name);
        setPoint(data[0].point);
    })
})

  if (username===''){
    return(
      <h1> loading ...</h1>
    )
  }
  return(
    <ProfileHeader username={username} point={point} email={email} />
  )
}

class ProfileHeader extends React.Component{
  constructor(props){
    super(props);
    this.state={
    login: true,
    username:this.props.username,
    point: this.props.point,
    email:this.props.email
    }
}

  render(){
    const login = this.state.login;
      return(
        <div>
        { login?
        (
          <div>
              <div class="container fluid">
                  <div class="card">
                      <div class="user text-center">
                      </div>
                      <div class="mt-5 text-center">
                          <h1 class="mb-0" style={{color: "#F4CB86"}}>
                            {this.props.username}
                            </h1> <span class="text-muted d-block mb-2" style={{color: "#F4CB86"}} >
                              {this.props.email} 
                              </span>  <h2 class="mb-0" style={{color: '#5D4E99'}}>Points: 
                              {this.props.point} 
                              </h2>
                      </div>
                      <></>
                  </div>
              </div>
              <div className="container-lg">
                  <div class="d-flex justify-content-between align-items-center mt-4 px-4">
                          <div class="stats">
                              <Button href="/profile/address" variant="outlined" sx={{bgcolor: '#5D4E99',color: "#F4CB86"}}> 
                              <MyLocationIcon fontSize="large" sx={{color: "#F4CB86"}}/> My Addreess</Button>
                          </div>
                          <div class="stats">
                              <Button  variant="outlined" sx={{bgcolor: '#5D4E99',color: "#F4CB86"}}>
                                <ManageAccountsIcon fontSize="large" sx={{color:  "#F4CB86"}}/>
                                {/* <Link to="/profile/account" state={{username: this.props.username, point:this.props.point, email: this.props.email,
        fname: this.props.fname, lname:this.props.lname, phone:this.props.phone, gender: this.props.gender, faculty:this.props.faculty, college:this.props.college,
        }}>My Account</Link> */}
        My Account
        </Button>
                          </div>
                          <div class="stats">
                              <Button  href="/" variant="outlined" sx={{bgcolor: '#5D4E99',color: "#F4CB86"}}>
                                <ReceiptLongIcon fontSize="large" sx={{color:  "#F4CB86"}}/>Shopping Record</Button> 
                          </div>
                  </div>
              </div>
              <Button classes="fixed-buttom" variant="outlined" sx={{bgcolor: '#5D4E99',color: "#F4CB86", m: 8, zIndex: 'tooltip' }} onClick={()=>this.setState({login: false})}>Sign out</Button>
          </div>
          )
          :(<div class="container fluid">
            Login to see more? 
            <Button classes="fixed-buttom" variant="outlined" sx={{bgcolor: '#5D4E99',color: "#F4CB86", m: 8, zIndex: 'tooltip' }} href="./login">Login</Button>
          </div>)
        }
        </div>
      )
  }
}

class Address extends React.Component{
    //get address
    constructor(){
      super();
      this.state = {count: 1};
    }
    componentDidMount(){
      return
    }
    render(){
        return(
            <>
            <Link href="/profile"><ArrowBackIcon/></Link>
            <div class="container fluid">
                    {/* <div class="card" id="addrs">
                        <h4>Address index</h4>
                        <p>first address</p>
                    </div> */}
                    <div class="form">
                        Add your new address!
                        <textarea style={{width:' 100%'}}></textarea>
                        <Button variant="outlined" sx={{bgcolor: '#5D4E99',color: "#F4CB86" }} >Submit</Button>
                    </div>
            </div>
            </>

        )
    }
}
// class Account extends React.Component{
//   constructor(){
//     super();
//     this.state={
//     login: true,
//     username:'',
//     point:-1,
//     email:'csci3100.d2@group.cuhk.edu.hk',
//     fname:'',
//     lname:'',
//     phone:'',
//     college:'',
//     faculty:'',
//     gender:'',
//     pic:'',
//     fetchFinish: true,
//     show: false,
// };}

//   async getInfo(){
//     return fetch('http://localhost:7000/dbAccount/get/'+this.state.email)
//     .then(res=>res.json())
//     .then(data=>{
//       console.log(data[0]);
//       // setUsername(data[0].user_name);
//       // console.log(this.state.user_name);
//       this.setState({username: data[0].user_name});
//       this.setState({fname: data[0].first_name});
//       this.setState({lname: data[0].last_name});
//       this.setState({phone: data[0].phone});
//       console.log("undefined???",data[0].college);

//       this.setState({college: data[0].college});
//       this.setState({faculty: data[0].faculty});
//       this.setState({gender: data[0].gender});
//       // userInfo = data[0];
//       // console.log(userInfo);
//     })
//     .catch((err)=>{console.log(err)});
//   }

// componentWillMount(){
//    this.getInfo()
//    .then(()=>{
//      console.log("fn",this.state.fname);
//      console.log("ln",this.state.lname);
//      this.setState({fetchFinish: true});
//    })
//    .catch(err=>{
//      console.log(err);
//      this.setState({fetchFinish: false});
//    })
//  }
//  render(){
//    if (this.state.fetchFinish == true){
//     return(
//       <>
//       <Link href="/profile" sx={{color: '#5D4E99'}}><ArrowBackIcon/></Link>
//       <IconButton sx={{float: 'right',color: '#5D4E99'}} onClick={()=> updateInfo()}><DoneIcon/></IconButton>
//       <Info username={this.state.username} point={this.state.point} email={this.state.email}
//       fname={this.state.fname} lname={this.state.lname} phone={this.state.phone} gender={this.state.gender}
//       faculty={this.state.faculty} college={this.state.college}/>
//       <ChooseGender gender={this.state.gender}/>
//       <ChooseCollege college={this.state.college}/>
//       <ChooseFaculty faculty={this.state.faculty}/>
//       <Button variant="outlined" sx={{bgcolor: '#5D4E99',color: "#F4CB86", m: 8 }} onClick={() => this.setstate({show: true})}>Change Password</Button>
//       {this.state.show &&  <ChangePw/>}
//       </>
//     );}}
// }

// function Account(props){
//    const [show, setShow] = useState(false);
//    const [username, setUsername] = useState('');
//    const[point, setPoint] = useState(-1);
//    const [email, setEmail] = useState('csci3100.d2@group.cuhk.edu.hk');
//    const [fname, setFname] = useState('');
//    const [lname, setLname] = useState('');
//    const [phone, setPhone] = useState('');
//    const [college, setCollege] = useState('');
//    const [faculty, setFaculty] = useState('');
//    const [gender, setGender] = useState('');
//    const [fetchFinish, setFetch] = useState(false);

//    useEffect(()=>{
//     fetch('http://localhost:7000/dbAccount/get/'+email)
//     .then(res=>res.json())
//     .then(data=>{
//         setUsername(data[0].user_name);
//         setPoint(data[0].point);
//         setFname(data[0].first_name);
//         setLname(data[0].last_name);
//         setPhone(data[0].phone);
//         if(data[0].college != undefined){
//           setCollege(data[0].college);
//         }
//         if(data[0].faculty != undefined){
//           setFaculty(data[0].faculty);
//         }
//         if(data[0].gender != undefined){
//           setGender(data[0].gender);
//         }
//         setFetch(true);
//     })
// })
//    if(fetchFinish == false){
//      return(
//        <h1>loading</h1>
//      )
//    }
//    if (fetchFinish == true){
//     return(
//       <>
//       <Link href="/profile" sx={{color: '#5D4E99'}}><ArrowBackIcon/></Link>
//       <IconButton sx={{float: 'right',color: '#5D4E99'}} onClick={()=> updateInfo()}><DoneIcon/></IconButton>
//       <Info username={username} point={point} email={email} fname={fname} lname={lname} phone={phone}/>
//       <ChooseGender gender={gender}/>
//       <ChooseCollege college={college}/>
//       <ChooseFaculty faculty={faculty}/>
//       <Button variant="outlined" sx={{bgcolor: '#5D4E99',color: "#F4CB86", m: 8 }} onClick={() => setShow(prev => !prev)}>Change Password</Button>
//       {show &&  <ChangePw/>}
//       </>
//     );}
// }

function Account(props){
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const[point, setPoint] = useState(-1);
  const [email, setEmail] = useState('csci3100.d2@group.cuhk.edu.hk');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [phone, setPhone] = useState('');
  const [college, setCollege] = useState('');
  const [faculty, setFaculty] = useState('');
  const [gender, setGender] = useState('');
  const [fetchFinish, setFetch] = useState(false);
  const [unique, setUnique] = useState(false);

  const handleChangeGender = (event)=>{
    setGender(event.target.value)
}
  const handleChangeFaculty = (event)=>{
    setFaculty(event.target.value)
}
  const handleChangeCollege = (event)=>{
    setCollege(event.target.value)
}
 const handleChangeFname = (event)=>{
  setFname(event.target.value)
  console.log("newfname",fname);
}
const handleChangeLname = (event)=>{
  setLname(event.target.value)
}
const handleChangeUsername = (event)=>{
  setNewUsername(event.target.value)
}

const handleChangePhone = (event)=>{
  setPhone(event.target.value)
}

  useEffect(()=>{
    if(fetchFinish == false){
   fetch('http://localhost:7000/dbAccount/get/'+email)
   .then(res=>res.json())
   .then(data=>{
       setUsername(data[0].user_name);
       setPoint(data[0].point);
       setFname(data[0].first_name);
       setLname(data[0].last_name);
       setPhone(data[0].phone);
       setCollege(data[0].college);
       setFaculty(data[0].faculty);
       setGender(data[0].gender);
       setFetch(true);
   })
   return;
  }
})

const checkUsername=async ()=>{
  try {
    const res = await fetch('http://localhost:7000/dbAccount/userName/' + username);
    const data = await res.json();
    console.log("user name?????", data.unique);
    if (data.unique == "false") {
      setUnique(false);
      window.alert("Username already exists. Please change your username");
    }
    if (data.unique == "true") {
      setUnique(true);
    }
   
  } catch (err) {
    console.log(err);
  }
}

const updateInfo = ()=>{
  console.log("updated info here");
  console.log(newUsername)
  console.log(fname)
  console.log(lname)
  console.log(phone)
  console.log(college)
  console.log(gender)
  console.log(faculty)
  if(newUsername==""){
    setNewUsername(username);
  }
  if(newUsername!=username){
    fetch('http://localhost:7000/dbAccount/userName/' + newUsername)
    .then(res=>res.json())
    .then((data)=>{
      if(data.unique == "false"){
        setUnique(false);
        window.alert("Username already exists. Please change your username");
      }else{
        setUnique(true);
      }
    })
    .catch(err=>console.log(err));
    }else{
  fetch('http://localhost:7000/dbAccount/updateAccount/'+email, { //saving to database
      method: 'POST', 
      body: new URLSearchParams({
          "user_name": newUsername,
          "first_name": fname,
          "last_name":lname,
          "phone": phone,
          "college": college,
          "faculty": faculty,
          "gender": gender,
      })  
  })
  .then(res=>console.log(res))
  .catch((err)=>{
      console.log(err);
  });
  window.location.reload();
}
  return;

}

  if(fetchFinish == false){
    return(
      <h1>loading</h1>
    )
  }
  if (fetchFinish == true){
   return(
     <>
     <Link href="/profile" sx={{color: '#5D4E99'}}><ArrowBackIcon/></Link>
     <IconButton sx={{float: 'right',color: '#5D4E99'}} onClick={updateInfo}><DoneIcon/></IconButton>
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
          label="First Name"
          defaultValue={fname}
          variant="standard"
          onChange={handleChangeFname}
        />
         <TextField
          required
          id="standard-required"
          label="Last Name"
          defaultValue={lname}
          variant="standard"
          onChange={handleChangeLname}
        />
        <TextField
          required
          id="standard-required"
          label="Username"
          defaultValue={username}
          variant="standard"
          onChange={handleChangeUsername}
        />
        <TextField
          required
          id="standard-required"
          label="Phone"
          defaultValue={phone}
          variant="standard"
          onChange={handleChangePhone}
        />
        <TextField
          id="standard-read-only-input"
          label="Read Only Your email"
          defaultValue={email}
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
        />
      </div>
    </Box>
     <Box sx={{margin: 8}}>
      <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Gender
          </InputLabel>
          <NativeSelect
          defaultValue={gender}
          onChange={handleChangeGender}
          >
          <option value="None">None</option>
          <option value="F">Female</option>
          <option value="M">Male</option>
          <option value="O">Others</option>
          </NativeSelect>
      </FormControl>
      </Box>
      <Box sx={{margin: 8}}>
      <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
          College
          </InputLabel>
          <NativeSelect
          defaultValue={college}
          onChange={handleChangeCollege}
          >
          <option value="None">None</option>
          <option value="CC">CC</option>
          <option value="CW">CW</option>
          <option value="MS">MS</option>
          <option value="NA">NA</option>
          <option value="SH">SH</option>
          <option value="SHAW">SHAW</option>
          <option value="UC">UC</option>
          <option value="WS">WS</option>
          <option value="WYS">WYS</option>
          </NativeSelect>
      </FormControl>
      </Box>
      <Box sx={{margin: 8}}>
      <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Faculty
          </InputLabel>
          <NativeSelect
          defaultValue={faculty}
          onChange={handleChangeFaculty}
          >
          <option value="None">None</option>
          <option value="Arts">Arts</option>
          <option value="Business Administration">Business Administration</option>
          <option value="Education">Education</option>
          <option value="Engineering">Engineering</option>
          <option value="Law">Law</option>
          <option value="Medicine">Medicine</option>
          <option value="Science">Science</option>
          <option value="Social Science">Social Science</option>
          <option value="Others">Others</option>
          </NativeSelect>
      </FormControl>
      </Box>
     <Button variant="outlined" sx={{bgcolor: '#5D4E99',color: "#F4CB86", m: 8 }} onClick={() => setShow(prev => !prev)}>Change Password</Button>
     {show &&  <ChangePw/>}
     </>
   );}
}



function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Current Password"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


class Info extends React.Component{
  constructor(props){
    super(props);
    console.log("fname",this.props.name);
  }

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
          label="First Name"
          defaultValue={this.props.fname}
          variant="standard"
        />
         <TextField
          required
          id="standard-required"
          label="Last Name"
          defaultValue={this.props.lname}
          variant="standard"
        />
        <TextField
          required
          id="standard-required"
          label="Username"
          defaultValue={this.props.username}
          variant="standard"
        />
        <TextField
          required
          id="standard-required"
          label="Phone"
          defaultValue={this.props.phone}
          variant="standard"
        />
        <TextField
          id="standard-read-only-input"
          label="Read Only Your email"
          defaultValue={this.props.email}
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
        />
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
          <option value="F">Female</option>
          <option value="M">Male</option>
          <option value="O">Others</option>
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

class ChangePw extends React.Component{
  render(){
    return(
      <>
      <TextField
          id="standard-password-input"
          label="Current Password"
          type="password"
          autoComplete="current-password"
          variant="standard"
          sx={{m:3}}
        />
         <br></br>
        <TextField
          id="standard-password-input"
          label="New Password"
          type="password"
          autoComplete="current-password"
          variant="standard"
          sx={{m:3}}
        />
         <br></br>
        <TextField
          id="standard-password-input"
          label="Enter again"
          type="password"
          autoComplete="current-password"
          variant="standard"
          sx={{m:3}}
        />
        <br></br>
        <Button variant="outlined" sx={{bgcolor: '#5D4E99',color: "#F4CB86", m: 3 }}>Confirm</Button>
      </>
    )
  }
}


export { Profile, Account, Address};