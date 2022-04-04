import React, {useEffect, useState, useContext} from 'react';
import {UserContext} from './UserContext';
import logo from './image/logo.jpeg';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DoneIcon from '@mui/icons-material/Done';
import PhoneIcon from '@mui/icons-material/Phone';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import { DataGrid } from '@mui/x-data-grid';
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
  Input,
  FormControl,
  Select,
  FormHelperText,
  NativeSelect,
  MenuItem,
  IconButton,
  Avatar,
} from '@mui/material';
import { SentimentSatisfiedOutlined, TryOutlined } from '@mui/icons-material';

let userInfo = [];

function Profile(){
  const {user, setUser} = useContext(UserContext);
  const[username,setUsername] = useState('');
  const[email,setEmail] = useState('0.0@link.cuhk.edu.hk');
  const[point,setPoint] = useState(-1);
  const[pic, setPic] = useState('');
  const[fetchFinish, setFetch] = useState(true);

  useEffect(()=>{
    fetch('http://localhost:7000/dbAccount/get/'+user)
    .then(res=>res.json())
    .then(data=>{
        console.log(data[0]);
        setEmail(data[0].email);
        setUsername(data[0].user_name);
        setPoint(data[0].point);
        setPic(data[0].pic);
        setFetch(true);
    })
    .catch(err=>{
      console.log(err);
      setFetch(false);
    })
})

  if (username===''||fetchFinish == false){
    return(
      <h1> loading ...</h1>
    )
  }
  return(
    <ProfileHeader username={username} point={point} email={email} pic={pic} uid={user}/>
  )
}


class ProfileHeader extends React.Component{
  constructor(props){
    super(props);
    this.state={
    login: true,
    username:this.props.username,
    point: this.props.point,
    email:this.props.email,
    pic: this.props.pic,
    edit: true,
    change: false,
    }
    this.changeIcon = this.changeIcon.bind(this);
    this.updateIcon = this.updateIcon.bind(this);
}

updateIcon(){
  console.log("pic",this.state.pic);
    fetch('http://localhost:7000/dbAccount/changePic/'+this.props.uid, {
      method: 'POST', 
      body: new URLSearchParams({
          "pic": this.state.pic,
      })  
    })
    .then(data=>console.log(data))
    .then(()=>{
      this.setState({edit: true});
    })
    .catch((error)=>{
      console.log(error);
    })
      window.location.reload();
      return;
}

changeIcon(event){
    var formData = new FormData();
    formData.append('file', event.target.files[0]);
    this.setState({edit: false});
    fetch('http://localhost:7000/dbAccount/photo/post', {
        method: 'POST', 
        body: formData
    })
    .then(response =>  response.json())
    .then(data => {
      console.log(data.filename);
       this.setState({pic: data.filename});
       return;
    })
    .catch((error) => {
        console.log(error);
    });

}

  render(){
      return(
        <div>
        { this.props.uid?
        (
          <div>
              <div class="container fluid">
                  <div class="card">
                      <div class="user text-center">
                      </div>
                      <div class="mt-5 text-center">
                      
                        {this.state.edit&&!this.state.change? 
                        <>
                        <label htmlFor="icon-button-file" >
                        <Avatar 
                        src={'http://localhost:7000/dbAccount/photo/get/'+this.props.pic}
                        style={{
                          margin: "2px",
                          width: "200px",
                          height: "200px",
                        }} 
                      />
                           <Input accept="image/*" id="icon-button-file" name="photo" type="file" sx={{display:"none"}} onChange={this.changeIcon}/>
                           <IconButton color="primary" aria-label="upload picture" component="span">
                          <EditIcon/>
                          </IconButton>
                          </label></>
                          :<>
                          <label for="button">
                              <Avatar 
                            src={'http://localhost:7000/dbAccount/photo/get/'+this.state.pic}
                            style={{
                              margin: "2px",
                              width: "200px",
                              height: "200px",
                              justifyContent: "center", 
                              display: "flex" 
                            }} 
                          />
                          <IconButton style={{color: '#5D4E99'}} onClick={this.updateIcon}>
                            <CheckIcon/>
                            </IconButton>
                            </label>
                            </>}
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
                              <Button  href="/profile/account" variant="outlined" sx={{bgcolor: '#5D4E99',color: "#F4CB86"}}>
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

function Address(){
  const [email,setEmail] = useState('0.0@link.cuhk.edu.hk');
  const [fetchFinish, setFetch] = useState(false);
  const [savedAddress,setAddress] = useState([]);
  const {user, setUser} = useContext(UserContext);

  useEffect(()=>{
    fetch('http://localhost:7000/dbAccount/getAddress/'+user)
    .then(res=>res.json())
    .then(res=>setAddress(res))
    // .then(()=>console.log(savedAddress))
    .then(()=>setFetch(true))
    .catch(err=>{console.log(err);
    setFetch(false);
  })
  })

  if(fetchFinish == false){
    return(
      <h1>loading</h1>
    )
  }
  if(fetchFinish == true){
    return(
      <>
      <Link href="/profile"><ArrowBackIcon/></Link>
      {savedAddress.map((address, index)=>(
        <>
        <h5>Address {index}</h5>
        <p key={address}>{address}</p>
        <br></br>
        </>
      ))}
      <AddNewAddress email={email}/>
      </>
    )
    }
}

function AddNewAddress(props){
  const college =["None","CC","CW","MS","NA","SH","SHAW","UC","WS","WYS","Others"];
  const building=["None","AB1 Academic Building No.1","AMEW Art Museum East Wing","ARC Lee Shau Kee Architecture Building","BMS Basic Medical Sciences Building",
"CCCC Chung Chi College Chapel","CCT Chung Chi College Theology Building","CK TSE C.K. Tse Room (C.C. Library)","CKB Chen Kou Bun Building",
"CML Ch'ien Mu Library",
"CWC C.W. Chu College",
"CYT Cheng Yu Tung Building",
"ELB Esther Lee Building",
"ERB William M.W. Mong Engineering Building",
"FYB Wong Foo Yuan Building",
"HCA Pi Chiu Building",
"HCF Sir Philip Haddon-Cave Sports Field",
"HTB Ho Tim Building",
"HTC Haddon-Cave Tennis Court # 6, 7",
"HYS Hui Yeung Shing Building",
"IBSB Lo Kwee-Seong Integrated Biomedical Sciences Building",
"ICS Institute of Chinese Studies",
"KHB Fung King Hey Building",
"KKB Leung Kau Kui Building",
"KSB Kwok Sports Building",
"LDS Li Dak Sum Building",
"LHC Y.C. Liang Hall",
"LHCH Lee Hysan Concert Hall",
"LKC Li Koon Chun Hall",
"LN Lingnan Stadium, Chung Chi College",
"LPN LT Lai Chan Pui Ngong Lecture Theatre",
"LSB Lady Shaw Building",
"LSK Lee Shau Kee Building",
"LWC Li Wai Chun Building",
"MCO Morningside College Seminar Room",
"MMW Mong Man Wai Building",
"NAA Cheng Ming Building, New Asia College",
"NAG New Asia College Gymnasium",
"NAH Humanities Building, New Asia College",
"NATT New Asia College Table Tennis Room",
"PGH3 MPH Multi-purpose Hall, Jockey Club Postgraduate Hall 3",
"PSC MPH Multi-purpose Hall, Pommerenke Student Centre",
"RRS Sir Run Run Shaw Hall",
"SB Sino Building",
"SC Science Centre",
"SCE Science Centre East Block",
"SCSH Multi-purpose Sports Hall, Shaw College",
"SCTT Table Tennis Room, Shaw College",
"SHB Ho Sin-Hang Engineering Building",
"SP Swimming Pool",
"SWC LT Lecture Theatre, Shaw College",
"SWH Swire Hall, Fung King Hey Building",
"TC Tennis Court # 3, 4, 5",
"TYW LT T.Y. Wong Hall, Ho Sin-Hang Engineering Building",
"UC TT Table Tennis Room, United College",
"UCA Tsang Shiu Tim Building, United College",
"UCC T.C. Cheng Building, United College",
"UCG The Thomas H.C. Cheung Gymnasium of United College",
"UG University Gymnasium",
"USC TT University Sports Centre, Table Tennis Room",
"WLS Wen Lan Tang, Shaw College",
"WMY Wu Ho Man Yuen Building",
"WS1 Lee W.S. College South Block",
"WYST Wu Yee Sun College Theatre",
"YCT President Chi-tung Yung Memorial Building",
"YIA Yasumoto International Academic Park"]

const ccHall = ["Hua Lien Tang",
  "Lee Shu Pui Hall",
  "Madam S. H. Ho Hall",
  "Ming Hua Tang",
  "Pentecostal Mission Hall Complex (High Block)"	,
  "Pentecostal Mission Hall Complex (Low Block)",
  "Theology Building",
  "Wen Chih Tang",
  "Wen Lin Tang",
  "Ying Lin Tang"];
const naHall = ["Chih Hsing Hall","Xuesi Hall","Grace Tien Hall","Daisy Li Hall"];
const ucHall = ["Adam Schall Residence","Bethlehem Hall","Chan Chun Ha Hostel","Hang Seng Hall"];
const shawHall = ["Kuo Mou Hall","Studnet Hostel II high block","Studnet Hostel II low block"];
const otherHall = ["iHouse block 1","iHouse block 2","iHouse block 3","iHouse block 4","iHouse block 5","Postgraduate Hall 1","Postgraduate Hall 2","Postgraduate Hall 3","Postgraduate Hall 4","Postgraduate Hall 5","Postgraduate Hall 6"]

const [chooseCol, setCol] = useState('');
const [chooseBlg, setBlg] = useState('');
const [room,setRoom] = useState('');
const {user, setUser} = useContext(UserContext);

  const handleChangeRoom = (event)=>{
    setRoom(event.target.value);
    console.log(event.target.value);
  }

  const handleChangeCollege=(event)=>{
    setCol(event.target.value);
    console.log(event.target.value);
  }

  const handleChangeBuilding=(event)=>{
    setBlg(event.target.value);
    console.log(event.target.value);
  }

  const handleNewAddress=(event)=>{
    fetch('http://localhost:7000/dbAccount/addAddress/'+props.email, { 
      method: 'POST', 
      body: new URLSearchParams({
         "uid": user,
         "room": room,
         "building": chooseBlg,
         "college": chooseCol,
      })  

    })
    .then(()=>console.log())
    .catch(err=>console.log(err))
  }

  if(chooseCol=="None"||chooseCol == ""){
    return(
      <>
        <h5>Add new address</h5>
         <Box sx={{ m: 5 ,display: 'inline'}}>
        <TextField
          id="standard-required"
          label="Room"
          variant="standard"
          onChange={handleChangeRoom}
        />
        </Box>
        <Box sx={{ m: 5  ,display: 'inline'}}>
      <FormControl >
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Building
        </InputLabel>
        <NativeSelect
        onChange={handleChangeBuilding}
        >
          {building.map((blg,index)=>(<option value={blg} key={blg}>{blg}</option>))}
        </NativeSelect>
      </FormControl>
        </Box>
        
         <Box sx={{ m: 5 ,display: 'inline'}}>
      <FormControl sx={{width:500}}>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          College (select if you are inside a college hostel,non college hostel please select Others)
        </InputLabel>
        <NativeSelect
        defaultValue={chooseCol}
        onChange={handleChangeCollege}
        >
          {college.map((col,index)=>(<option key={col}value={col}>{col}</option>))}
        </NativeSelect>
      </FormControl>
      <IconButton  sx={{float: 'right',color: '#5D4E99'}} onClick={handleNewAddress}>
        <CheckIcon/>
        save
      </IconButton>
        </Box>
        </>
    )
  }else if(chooseCol=="CC"){
    return(
    <>
      <h5>Add new address</h5>
       <Box sx={{ m: 5 ,display: 'inline'}}>
      <TextField
        id="standard-required"
        label="Room"
        variant="standard"
        onChange={handleChangeRoom}
      />
      </Box>
      <Box sx={{ m: 5 ,display: 'inline'}}>
    <FormControl >
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        CC Hostel
      </InputLabel>
      <NativeSelect
      onChange={handleChangeBuilding}
      >
        {ccHall.map((col,index)=>(<option value={ccHall[index]}>{ccHall[index]}</option>))}
      </NativeSelect>
    </FormControl>
      </Box>
      
       <Box sx={{ m: 5 ,display: 'inline'}}>
    <FormControl sx={{width:500}}>
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        College (select if you are inside a college hostel,non college hostel please select Others)
      </InputLabel>
      <NativeSelect
      onChange={handleChangeCollege}
      >
        {college.map((col,index)=>(<option key={col}value={col}>{col}</option>))}
      </NativeSelect>
    </FormControl>
      </Box>
      <IconButton  sx={{float: 'right',color: '#5D4E99'}} onClick={handleNewAddress}>
        <CheckIcon/>
        save
      </IconButton>
      </>
    )
  }else if(chooseCol=="NA"){
    return(
      <>
      <h5>Add new address</h5>
       <Box sx={{ m: 5 ,display: 'inline'}}>
      <TextField
        id="standard-required"
        label="Room"
        variant="standard"
        onChange={handleChangeRoom}
      />
      </Box>
      <Box sx={{ m: 5 ,display: 'inline'}}>
    <FormControl >
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        NA Hostel
      </InputLabel>
      <NativeSelect
      onChange={handleChangeBuilding}
      >
        {naHall.map((col,index)=>(<option value={naHall[index]}>{naHall[index]}</option>))}
      </NativeSelect>
    </FormControl>
      </Box>
      
       <Box sx={{ m: 5 ,display: 'inline'}}>
    <FormControl sx={{width:500}}>
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        College (select if you are inside a college hostel,non college hostel please select Others)
      </InputLabel>
      <NativeSelect
      onChange={handleChangeCollege}
      >
        {college.map((col,index)=>(<option key={col}value={col}>{col}</option>))}
      </NativeSelect>
    </FormControl>
      </Box>
      <IconButton  sx={{float: 'right',color: '#5D4E99'}} onClick={handleNewAddress}>
        <CheckIcon/>
        save
      </IconButton>
      </>
    )
  }else if(chooseCol=="UC"){
    return(
      <>
      <h5>Add new address</h5>
       <Box sx={{ m: 5 ,display: 'inline'}}>
      <TextField
        id="standard-required"
        label="Room"
        variant="standard"
        onChange={handleChangeRoom}
      />
      </Box>
      <Box sx={{ m: 5 ,display: 'inline'}}>
    <FormControl >
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        UC Hostel
      </InputLabel>
      <NativeSelect
      onChange={handleChangeBuilding}
      >
        {ucHall.map((col,index)=>(<option value={ucHall[index]}>{ucHall[index]}</option>))}
      </NativeSelect>
    </FormControl>
      </Box>
      
       <Box sx={{ m: 5 ,display: 'inline'}}>
    <FormControl sx={{width:500}}>
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        College (select if you are inside a college hostel,non college hostel please select Others)
      </InputLabel>
      <NativeSelect
      onChange={handleChangeCollege}
      >
        {college.map((col,index)=>(<option key={col}value={col}>{col}</option>))}
      </NativeSelect>
    </FormControl>
      </Box>
      <IconButton  sx={{float: 'right',color: '#5D4E99'}} onClick={handleNewAddress}>
        <CheckIcon/>
        save
      </IconButton>
      </>
    )
  }else if(chooseCol=="SHAW"){  
    return(
      <>
      <h5>Add new address</h5>
       <Box sx={{ m: 5 ,display: 'inline'}}>
      <TextField
        id="standard-required"
        label="Room"
        variant="standard"
        onChange={handleChangeRoom}
      />
      </Box>
      <Box sx={{ m: 5 ,display: 'inline'}}>
    <FormControl >
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        SHAW Hostel
      </InputLabel>
      <NativeSelect
      onChange={handleChangeBuilding}
      >
        {shawHall.map((col,index)=>(<option value={shawHall[index]}>{shawHall[index]}</option>))}
      </NativeSelect>
    </FormControl>
      </Box>
      
       <Box sx={{ m: 5 ,display: 'inline'}}>
    <FormControl sx={{width:500}}>
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        College (select if you are inside a college hostel,non college hostel please select Others)
      </InputLabel>
      <NativeSelect
      onChange={handleChangeCollege}
      >
        {college.map((col,index)=>(<option key={col}value={col}>{col}</option>))}
      </NativeSelect>
    </FormControl>
      </Box>
      <IconButton  sx={{float: 'right',color: '#5D4E99'}} onClick={handleNewAddress}>
        <CheckIcon/>
        save
      </IconButton>
      </>
    )
  }else if(chooseCol=="Others"){
    return(
      <>
      <h5>Add new address</h5>
       <Box sx={{ m: 5 ,display: 'inline'}}>
      <TextField
        id="standard-required"
        label="Room"
        variant="standard"
        onChange={handleChangeRoom}
      />
      </Box>
      <Box sx={{ m: 5 ,display: 'inline'}}>
    <FormControl >
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        Hostel
      </InputLabel>
      <NativeSelect
      onChange={handleChangeBuilding}
      >
        {otherHall.map((col,index)=>(<option value={otherHall[index]}>{otherHall[index]}</option>))}
      </NativeSelect>
    </FormControl>
      </Box>
      
       <Box sx={{ m: 5 ,display: 'inline'}}>
    <FormControl sx={{width:500}}>
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        College (select if you are inside a college hostel,non college hostel please select Others)
      </InputLabel>
      <NativeSelect
      // defaultValue={chooseCol}
      onChange={handleChangeCollege}
      >
        {college.map((col,index)=>(<option key={col}value={col}>{col}</option>))}
      </NativeSelect>
    </FormControl>
      </Box>
      <IconButton  sx={{float: 'right',color: '#5D4E99'}} onClick={handleNewAddress}>
        <CheckIcon/>
        save
      </IconButton>
      </>
    )
  }else{
    return(
    <>
    <h5>Add new address</h5>
     <Box sx={{ m: 5 ,display: 'inline'}}>
    <TextField
      id="standard-required"
      label="Room"
      variant="standard"
      onChange={handleChangeRoom}
    />
    </Box>
     <Box sx={{ m: 5 ,display: 'inline'}}>
  <FormControl sx={{width:500}}>
    <InputLabel variant="standard" htmlFor="uncontrolled-native">
      College (select if you are inside a college hostel,non college hostel please select Others)
    </InputLabel>
    <NativeSelect
    onChange={handleChangeCollege}
    >
      {college.map((col,index)=>(<option key={col}value={col}>{col}</option>))}
    </NativeSelect>
  </FormControl>
    </Box>
    <IconButton  sx={{float: 'right',color: '#5D4E99'}} onClick={handleNewAddress}>
      <CheckIcon/>
      save
    </IconButton>
    </>)
  }
    // return(
    //     <>
    //     <h5>Add new address</h5>
    //      <Box sx={{ m: 5 ,display: 'inline'}}>
    //     <TextField
    //       id="standard-required"
    //       label="Room"
    //       variant="standard"
    //       onChange={handleChangeRoom}
    //     />
    //     </Box>
    //     <Box sx={{ m: 5  ,display: 'inline'}}>
    //   <FormControl >
    //     <InputLabel variant="standard" htmlFor="uncontrolled-native">
    //       Building
    //     </InputLabel>
    //     <NativeSelect
    //     onChange={handleChangeBuilding}
    //     >
    //       {building.map((blg,index)=>(<option value={blg} key={blg}>{blg}</option>))}
    //     </NativeSelect>
    //   </FormControl>
    //     </Box>
        
    //      <Box sx={{ m: 5 ,display: 'inline'}}>
    //   <FormControl sx={{width:500}}>
    //     <InputLabel variant="standard" htmlFor="uncontrolled-native">
    //       College (select if you are inside a college hostel,non college hostel please select Others)
    //     </InputLabel>
    //     <NativeSelect
    //     onChange={handleChangeCollege}
    //     >
    //       {college.map((col,index)=>(<option key={col}value={col}>{col}</option>))}
    //     </NativeSelect>
    //   </FormControl>
    //     </Box>
    //     </>

    // )
    
}

function Account(props){
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const[point, setPoint] = useState(-1);
  const [email, setEmail] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [phone, setPhone] = useState('');
  const [college, setCollege] = useState('');
  const [faculty, setFaculty] = useState('');
  const [gender, setGender] = useState('');
  const [fetchFinish, setFetch] = useState(false);
  const [unique, setUnique] = useState(false);
  const colleges =["None","CC","CW","MS","NA","SH","SHAW","UC","WS","WYS","Others"];
  const faculties = ["None","Arts","Business Administration","Education","Engineering","Law","Medicine","Science","Social Science","Others"];
  const genders = ["None","Male","Female","Others"];
  const {user, setUser} = useContext(UserContext);

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
   fetch('http://localhost:7000/dbAccount/get/'+user)
   .then(res=>res.json())
   .then(data=>{
       setEmail(data[0].email);
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

    console.log("checkname");
    fetch('http://localhost:7000/dbAccount/userName/' + newUsername)
    .then(res=>res.json())
    .then((data)=>{
      if(data.unique == "false"){
        setUnique(false);
        window.alert("Username already exists. Please change your username");
        return;
      }else{
        setUnique(true);
      }
    })
    .catch(err=>console.log(err));
    if(newUsername==""){
  fetch('http://localhost:7000/dbAccount/updateAccount/'+user, { //saving to database
      method: 'POST', 
      body: new URLSearchParams({
          "user_name": username,
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
}else{
  fetch('http://localhost:7000/dbAccount/updateAccount/'+user, { //saving to database
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
          label="email"
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
          {genders.map((gen,index)=>(<option key={gen} value={gen}>{gen}</option>))}
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
         {colleges.map((col,index)=>(<option key={col}value={col}>{col}</option>))}
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
            {faculties.map((fac,index)=>(<option key={fac}value={fac}>{fac}</option>))}
          </NativeSelect>
      </FormControl>
      </Box>
     {/* <Button variant="outlined" sx={{bgcolor: '#5D4E99',color: "#F4CB86", m: 8 }} onClick={() => setShow(prev => !prev)}>Change Password</Button>
     {show &&  <FormDialog email={email}/>} */}
     <FormDialog email={email}/>
     </>
   );}
}



function FormDialog(props) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [oldpw, setOld] = useState('');
  const [pw1, setPw1] = useState('');
  const [pw2, setPw2] = useState('');
  const [submitValid, setSubmit] = useState(false);
  const [veri, setVeri] = useState(false);
  const [pw, setPw] = useState('');
  const {user, setUser} = useContext(UserContext);
  const handleClickOpen = (event) => {
    setOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  const handleChangeOld = (event) => {
    setOld(event.target.value)
  };

  const handleChangeNew = (event) => {
    setPw1(event.target.value)
  };

  const handleChangeNewTwo = (event) => {
    setPw2(event.target.value)
  };

  const handleUpdate = () => {
    // fetch('http://localhost:7000/dbAccount/get/'+ props.email)
    //     .then(res=>res.json())
    //     .then(data=>{
    //         console.log(data[0].password);
    //         if(data[0].password == oldpw){
    //             console.log("password is true");
                
    //         }
    //     })
    //     .catch(err=>console.log(err))
    if (pw1!=pw2){
      window.alert("password and confirm password does not match.");
      return;
    }
    if(veri==false){
      window.alert("wrong password, please enter again.");
      return;
    }else{
      fetch('http://localhost:7000/dbAccount/updatePw/'+ user, { 
      method: 'POST', 
      body: new URLSearchParams({
          "password": pw2
      })  
    })
    .then(()=>{
              // setOpen(false);
              // setAnchorEl(null);
              setOld("");
              setPw1("");
              setPw2("");
              return;
    })
    .catch(err=>console.log(err))
    window.alert("Changes saved");
    setOpen(false);
    setAnchorEl(null);
    // return;
      }
    
    };

  useEffect(()=>{
    if(oldpw!="" && pw1!="" && pw2!=""){
      setSubmit(true);
    }else{
      setSubmit(false);
    }
    if(oldpw==""){
      fetch('http://localhost:7000/dbAccount/get/'+ user)
        .then(res=>res.json())
        .then(data=>{
          setPw(data[0].password);
        })
        .catch(err=>console.log(err))
    }else{
      if(oldpw==pw){
        setVeri(true);
      }else{
        setVeri(false);
      }
    }
  });

  return (
    <div>
      <Button variant="outlined" sx={{bgcolor: '#5D4E99',color: "#F4CB86", m: 8 }} 
      aria-owns={open ? 'simple-open' : null} aria-haspopup="true" onClick={handleClickOpen}>Change Password</Button>
      <Dialog 
      id='simple-open'
      open={open} 
      onClose={handleClose}
      PaperProps={{sx:{position: "fixed", top:10}}}
      anchorEl={anchorEl}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      sx={{zIndex: '99999 !important'}}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Current Password"
            type="password"
            fullWidth
            variant="standard"
            value={oldpw}
            onChange={handleChangeOld}
          />
          <TextField
            autoFocus
            margin="dense"
            label="New Password"
            type="password"
            fullWidth
            variant="standard"
            value={pw1}
            onChange={handleChangeNew}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Confirm New Password"
            type="password"
            fullWidth
            variant="standard"
            value={pw2}
            onChange={handleChangeNewTwo}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} >Cancel</Button>
          <Button onClick={handleUpdate} disabled={!submitValid}>Save</Button>
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

let info = []
function AdminUser(){

const columns = [
  { field: 'uid', headerName: 'ID', width:180 },
  {
    field: 'first_name',
    headerName: 'First name',
    width: 160,
  },
  {
    field: 'last_name',
    headerName: 'Last name',
    width: 80,
  },
  {
    field: 'user_name',
    headerName: 'username',
    type: 'number',
    width: 100,
  },
  {
    field: 'point',
    headerName: 'Point',
    width: 50,
  },
  {
    field: 'phone',
    headerName: 'Phone'
  },
  {
    field: 'email',
    headerName: 'email',
    width: 300,
  },
  {
    field: 'verify',
    headerName: 'Verify',
    width: 50,
  },
  // {
  //   field: 'college',
  //   headerName: 'Collge'
  // },
  // {
  //   field: 'faculty',
  //   headerName: 'Faculty'
  // },
  // {
  //   field: 'gender',
  //   headerName: 'gender'
  // },
];
const [userinfo,setInfo] = useState();
const [mounted, setMounted] = useState(false);
const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

if(!mounted){
  fetch('http://localhost:7000/dbAccount/getAll')
  .then(res=>res.json())
  .then(data=>{
   setInfo(data);
    console.log(data);
  })
  .catch(err=>console.log(err))

}

 useEffect(()=>{
   setMounted(true);
 })
 
 if(mounted == false){
   return(
     <h1>loading</h1>
   );
 }else{
   return(
    <AdminTable row={userinfo} col={columns}/>
  );
}
}

function AdminTable(props){
  return(
    <div style={{ height: 800, width: '100%' }}>
      <DataGrid
        getRowId={row => row._id}
        rows={props.row}
        columns={props.col}
        pageSize={10}
        rowsPerPageOptions={[10]}
        // checkboxSelection
      />
    </div>
  );
}
export { Profile, Account, Address, AdminUser, AddNewAddress};