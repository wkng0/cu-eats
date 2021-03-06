import React, {useEffect, useState, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from './UserContext';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid  } from '@mui/x-data-grid';
import{ Divider, Box, Button, Card, CardActionArea,CardActions, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, 
  InputLabel, Input, FormControl, NativeSelect, IconButton, Avatar, Skeleton, Typography, CardContent} from '@mui/material';

// PROGRAM Profile - program check the user and return their profile page
// CALLING SEQUENCE: 
// 1. Login in as customer/restaurant -> click the top right corner profile picture icon -> profile
// Or
// 2. Login as Admin -> click the user Info -> check profile
// RPOGRAMMER: Ng Wing Ki Vickie
// VERSION 1.0: 22-3-2022
// REVISION 1.1 : 29-3-2022 To seperate the profile component from this function
// DATA STRUCTURE:
//   Variable fetchFinish - BOOLEAN
//   Variable userData - ARRAY
// ALGORITHM:
//   1. check usertype and find the profile user
//   2. fetch user info from database
//   3. render ProfileHeader/Restaurant Header

function Profile(){
  const[fetchFinish, setFetch] = useState(false);
  const [userData, setUserData]=useState({
    user: "",
    email:"",
    username:"",
    point:-1,
    pic:"",
  })

  useEffect(()=>{
    let tempUser;
    if(localStorage.getItem('type') == "user"){
      tempUser=localStorage.getItem('user')
      console.log("set!",tempUser);
    }else if(localStorage.getItem('type')=="admin"){
      tempUser=localStorage.getItem('check');
    }
    if(fetchFinish== false){
      fetch('/dbAccount/getByUID/'+tempUser)
      .then(res=>res.json())
      .then(data=>{
          console.log(data);
          setUserData({
            user:tempUser,
            email:data[0].email,
            username:data[0].user_name,
            point: data[0].point,
            pic:data[0].pic,
          })
          console.log(data[0]);
          setFetch(true);
      })
      .catch(err=>{
        console.log(err);
        setFetch(false);
    })}
})

  if (userData.username===''||fetchFinish == false){
    return(
      <React.Fragment>
       <div class="container fluid">
                  <div class="card">
                      <div class="user text-center">
                      </div>
                      <div class="mt-5 text-center">
        <Skeleton variant="rectangular"  height={300} animation ="wave" width="100%">
            <div style={{ paddingTop: '57%' }} />
          </Skeleton>
          
          <Skeleton animation="wave" height={50} width="100%" />
          </div>
          </div>
          </div>
      </React.Fragment>
    )
  }
  return(
    <ProfileHeader username={userData.username} point={userData.point} email={userData.email} pic={userData.pic} uid={userData.user}/>
  )
}

// PROGRAM ProfileHeader To display user info and guiding to other function
// CALLING SEQUENCE: Profile->ProfileHeader
// PROGRAMMER: Ng Wing Ki Vickie
// VERESION 1.0: 29-3-2022
// Purpose: show and edit the profile icon, show username and points, link to change address, account info and shopping receipt
// DATA STRUCTURE
//   Variable login - BOOLEAN
//   Variable username - STRING
//   Variable point - Float
//   Variable email - STRING
//   Variable pic - STRING
//   Variable edit - BOOLEAN
//   Variable change - BOOLEAN
// ALGORITHM
// 1. display the icon and buttons to address, account, shopping receipts
// 2. If clicked profile icon/ the edit icon, pop up upload photo
// 3. Preview the new profile icon
// 4. Click the tick button to confirm and save the updated profile icon
// 5. Refresh the page
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
    fetch('/dbAccount/changePic/'+this.props.uid, {
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
    fetch('/dbAccount/photo/post', {
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
                        src={'/dbAccount/photo/get/'+this.props.pic}
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
                            src={'/dbAccount/photo/get/'+this.state.pic}
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
                              </span>  <h2 class="mb-0" style={{color: '#5D4E99'}}>Points: {this.props.point}</h2>
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
                               
        My Account
        </Button>
                          </div>
                          <div class="stats">
                              <Button  href="/record" variant="outlined" sx={{bgcolor: '#5D4E99',color: "#F4CB86"}}>
                                <ReceiptLongIcon fontSize="large" sx={{color:  "#F4CB86"}}/>Shopping Record</Button> 
                          </div>
                  </div>
              </div>
          </div>
        </div>
      )
  }
}

// PROGRAM RestaurantProfile Program to display and edit 
// CALLING SEQUENCE: Profile->RestaurantProfile
// PROGRAMMER: Ng Wing Ki Vickie
// VERSION 1.0:
// PURPOSE: show the profile icon and username for the restaurant account
// DATA VARIABLES
//     Variable edit - BOOLEAN
//     Variable change - BOOLEAN
//     Variable userData - ARRAY
// ALGORITHM
// 1. fetch information from database
// 2. display profile icon
// 3. click on the pencil/ photo to edit icon
// 4. upload new photo
// 5. preview photo
// 6. click the tick button to confirm and save new photo
// 7. refresh the page
function RestaurantProfile(){
  const [edit,setEdit] = useState(true);
  const [change,setChange] = useState(false);
  const [fetchFinish, setFetch] = useState(false);
  const [userData,setUserData]=useState({
    user:null,
    email:null,
    pic:null,
  })

  const updateIcon =()=>{
    console.log(userData.pic);
      fetch('/dbAccount/changePic/'+userData.user, {
        method: 'POST', 
        body: new URLSearchParams({
            "pic": userData.pic,
        })  
      })
      .then(data=>console.log(data))
      .then(()=>{
        setEdit(true);
      })
      .catch((error)=>{
        console.log(error);
      })
        window.location.reload();
        return;
  }
  
  const changeIcon= (event)=>{
      var formData = new FormData();
      formData.append('file', event.target.files[0]);
      setEdit(false);
      fetch('/dbAccount/photo/post', {
          method: 'POST', 
          body: formData
      })
      .then(response =>  response.json())
      .then(data => {
        console.log(data.filename);
         setUserData({
          user:userData.user,
          email:userData.email,
          pic:data.filename,
         })
         return;
      })
      .catch((error) => {
          console.log(error);
      });
  
  }


  useEffect(()=>{
    let tempUser;
    if(localStorage.getItem('type')=="restaurant"){
      tempUser=localStorage.getItem('user');
    }
    if(fetchFinish==false){
    fetch('/dbAccount/getByUID/'+tempUser)
    .then(res=>res.json())
    .then(data=>{
        // console.log(data[0]);
        setUserData({
          user:tempUser,
          email:data[0].email,
          pic:data[0].pic,
        })
        // console.log(data[0].pic);
        setFetch(true);
    })
    .catch(err=>{
      console.log(err);
      setFetch(false);
    })
  }
})

  if(fetchFinish==false){
    return(
      <h1>loading</h1>
    );
  }else{
    return(
    <Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justify="center"
 >
   <Card sx={{width:800}}>
   <div class="mt-5 text-center">
    {edit&&!change? 
      <>
      <label htmlFor="icon-button-file" >
      <Avatar 
      src={'/dbAccount/photo/get/'+userData.pic}
      style={{
        margin: "2px",
        width: "200px",
        height: "200px",
      }} 
    />
         <Input accept="image/*" id="icon-button-file" name="photo" type="file" sx={{display:"none"}} onChange={changeIcon}/>
         <IconButton color="primary" aria-label="upload picture" component="span">
        <EditIcon/>
        </IconButton>
        </label></>
        :<>
        <label for="button">
            <Avatar 
          src={'/dbAccount/photo/get/'+userData.pic}
          style={{
            margin: "2px",
            width: "200px",
            height: "200px",
            justifyContent: "center", 
            display: "flex" 
          }} 
        />
        <IconButton style={{color: '#5D4E99'}} onClick={updateIcon}>
          <CheckIcon/>
          </IconButton>
          </label>
          </>}
          </div>
          <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
            >
          <CardActions>
            <FormDialog email={userData.email}/>
          </CardActions>
          </Grid>
      </Card>
      </Grid>
  )
        }
}

// PROGRAM Address Program to display and edit
// CALLING SEQUENCE Login->Profile->ProfileHeader->Address
// PROGRAMMER: Ng Wing Ki Vickie
// VERSION 1.0:
// Purpose delete saved address, call add address and show address
// DATA STRUCTURE
//     Variable fetchFinish - BOOLEAN
//     Variable savedAddress - ARRAY
//     Variable user - STRING
// ALGORITHM
// 1. fetch addresses from address database
// 2. render to display addresses and allow add/delete addresses
// 3. click the bin icon to delete corresponding address and reload page
function Address(){
  const [fetchFinish, setFetch] = useState(false);
  const [savedAddress,setAddress] = useState([]);
  const {user, setUser} = useContext(UserContext);
  const navigate = useNavigate();
  function deleteAdd(address){
    fetch('/dbAccount/delAddress/'+user, { 
      method: 'POST', 
      body: new URLSearchParams({
         "uid": user,
         "address": address,
      })  

    })
    .then(()=>console.log())
    .catch(err=>console.log(err))
    window.location.reload();
  }

  useEffect(()=>{
    if(localStorage.getItem('type') == "user"){
      setUser(localStorage.getItem('user'));
      console.log("set!",user);
  }else if(localStorage.getItem('type')=="admin"){
      setUser(localStorage.getItem('check'));
  }
    if(fetchFinish == false){
    fetch('/dbAccount/getAddress/'+user)
    .then(res=>res.json())
    .then(res=>{setAddress(res);})
    .then(()=>console.log(savedAddress))
    .then(()=>setFetch(true))
    .catch(err=>{console.log(err);
    setFetch(false);
  })}
  })

  if(fetchFinish == false){
    return(
        <React.Fragment>
          <div style={{width:'70%', margin:'auto'}}>
          <Typography component="div" variant="h3">
            <Skeleton animation="wave"/>
          </Typography>
          <Typography component="div" variant="h5">
            <Skeleton animation="wave" height={250}/>
          </Typography>
          <Typography component="div" variant="h5">
            <Skeleton animation="wave" height={250}/>
          </Typography>
          <Skeleton animation="wave" height={50} width="100%"/>
          </div>
        </React.Fragment>
    )
  }
  if(fetchFinish == true){
    return(
      <>
      <div style={{width:'90%', margin:'auto'}}>
      <Button 
          size="small" 
          onClick={()=>navigate(-1)}
          sx={{bgcolor: "transparent", color: '#5D4E99', ':hover': {bgcolor:'transparent', color: '#5D4E99'}}}
        >
          <ArrowBackIosIcon/>
        </Button>
      </div><br/>
      <div style={{width:'70%', margin:'auto'}}>
        <h3 style={{color: '#5D4E99'}}>My Address</h3><br/>
        {savedAddress.map((address, index)=>(
          <>
          <h5 style={{color: '#5D4E99'}}>Address {index+1}</h5>
          <IconButton sx={{float: 'right',color: '#5D4E99'}} onClick={()=>deleteAdd(address)}><DeleteIcon/></IconButton>
          <div key={address}>{address}</div>
          <br/>
          </>
        ))}
        <br/><Divider /><br/>  
        <AddNewAddress/>
      </div>
      </>
    )
    }
}

// PROGRAM AddNewAddress to update new address
// CALLING SEQUENCE: Profile-> ProfileHeader-> Address-> AddNewAddress
// PROGRAMMER: Ng Wing Ki Vickie
// VERSION 1.0: 2-4-2022
// REVISION 1.1: 8-4-2022 fix choices bug
// Allow user choose the corresponding delivery address in cuhk
// DATA STRUCTURE
//   Variable college - ARRAY
//   Variable building - ARRAY
//   Variable ccHall - ARRAY
//   Variable naHall - ARRAY
//   Variable ucHall - ARRAY
//   Variable shawHall - ARRAY
//   Variable msHall - ARRAY
//   Variable shHall - ARRAY
//   Variable wsHall - ARRAY
//   Variable wysHall - ARRAY
//   Variable otherHall - ARRAY
//   Variable chooseBlg - STRING
//   Variable chooseCol - STRING
//   Variable room - STRING
//   Variable valid - BOOLEAN
//   Variable user - STRING
//   Variable navigate - STRING
// ALGORITHM
// 1. choose the college
// 2. choose the building and fill in the room optionally
// 3. save and reload
function AddNewAddress(props){
  const college =["None","CC","CW","MS","NA","SH","SHAW","UC","WS","WYS","Other Hostel","Other Building"];
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

const ccHall = ["None","Hua Lien Tang",
  "Lee Shu Pui Hall",
  "Madam S. H. Ho Hall",
  "Ming Hua Tang",
  "Pentecostal Mission Hall Complex (High Block)"	,
  "Pentecostal Mission Hall Complex (Low Block)",
  "Theology Building",
  "Wen Chih Tang",
  "Wen Lin Tang",
  "Ying Lin Tang"];
const naHall = ["None","Chih Hsing Hall","Xuesi Hall","Grace Tien Hall","Daisy Li Hall"];
const ucHall = ["None","Adam Schall Residence","Bethlehem Hall","Chan Chun Ha Hostel","Hang Seng Hall"];
const shawHall = ["None","Kuo Mou Hall","Studnet Hostel II high block","Studnet Hostel II low block"];
const otherHall = ["None","iHouse","Postgraduate Hall","University Residence","UC staff Residence","Panacea Lodge"]
const msHall = ["None","Morningside College Tower Block","Maurice R. Greenberg Building"];
const shHall = ["None","Lee Quo Wei Hall","Ho Tim Hall"];
const wsHall = ["None","North Block","South Block"];
const wysHall = ["None","WYS East Block","WYS West Block"];
const [chooseCol, setCol] = useState('');
const [chooseBlg, setBlg] = useState('');
const [room,setRoom] = useState('');
const [valid, setValid] = useState(false);
const {user, setUser} = useContext(UserContext);
const navigate = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem('user') != undefined){
      setUser(localStorage.getItem('user'));
      console.log("set!",user);
  }
  })

  const handleChangeRoom = (event)=>{
    setRoom(event.target.value);
    console.log(event.target.value);
  }

  const handleChangeCollege=(event)=>{
    if(event.target.value=="None"){
      setCol("");
      return;
    }
    setCol(event.target.value);
    console.log(event.target.value);
    if(event.target.value=="CW"){
      console.log("SETTTT");
      setBlg("Student Hostel");
    }
  }

  const handleChangeBuilding=(event)=>{
    setBlg(event.target.value);
    console.log(event.target.value);
  }

  const handleNewAddress=(event)=>{
    if(chooseBlg==""||chooseBlg=="None"){
      window.alert("Choose the building please");
      return;
    }
    let address = "";
    if(room!=""){
      address += room + ", ";
    }
    address += chooseBlg;
    if(chooseCol!="Other Building" && chooseCol != "Other Hostel"){
      address += ", "+chooseCol;
    }
    console.log(address);
    fetch('/dbAccount/addAddress/'+user, { 
      method: 'POST', 
      body: new URLSearchParams({
         "uid": user,
         "address": address,
      })  

    })
    .then(()=>console.log())
    .catch(err=>console.log(err))
    navigate(0);
  }

  if(chooseCol=="Other Building"||chooseCol == ""|| chooseCol =="None"){
    return(
      <>
      <h5 style={{color: '#5D4E99'}}>Add new address</h5><br/>
       {chooseCol?<><Box sx={{m: 2, display: 'inline'}}>
      <TextField
        id="standard-required"
        label="Room"
        variant="standard"
        onChange={handleChangeRoom}
      />
      </Box>
      <Box sx={{ m: 2  ,display: 'inline'}}>
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
      </Box></>:<></>}
      
       <Box sx={{m: 2, display: 'inline'}}>
    <FormControl sx={{width:500}}>
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        College 
      </InputLabel>
      <NativeSelect
      defaultValue={chooseCol}
      onChange={handleChangeCollege}
      >
        {college.map((col,index)=>(<option key={col}value={col}>{col}</option>))}
      </NativeSelect>
    </FormControl><br/><br/>
    <Button  sx={{float: 'right',color: '#5D4E99'}} onClick={handleNewAddress}>
      <CheckIcon/>
      save
    </Button>
      </Box>
      </>
    )
  }else if(chooseCol=="CC"){
    return(
    <>
      <h5 style={{color: '#5D4E99'}}>Add new address</h5><br/>
       {chooseCol?<><Box sx={{m: 2, display: 'inline'}}>
      <TextField
        id="standard-required"
        label="Room"
        variant="standard"
        onChange={handleChangeRoom}
      />
      </Box>
      <Box sx={{m: 2, display: 'inline'}}>
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
      </Box></>:<></>}
      
       <Box sx={{m: 2, display: 'inline'}}>
    <FormControl sx={{width:500}}>
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        College 
      </InputLabel>
      <NativeSelect
      defaultValue={chooseCol}
      onChange={handleChangeCollege}
      >
        {college.map((col,index)=>(<option key={col}value={col}>{col}</option>))}
      </NativeSelect>
    </FormControl>
      </Box><br/><br/>
      <Button  sx={{float: 'right',color: '#5D4E99'}} onClick={handleNewAddress} disable={!valid}>
        <CheckIcon/>
        save
      </Button>
      </>
    )
  }else if(chooseCol=="NA"){
    return(
      <>
      <h5 style={{color: '#5D4E99'}}>Add new address</h5><br/>
       {chooseCol?<><Box sx={{m: 2, display: 'inline'}}>
      <TextField
        id="standard-required"
        label="Room"
        variant="standard"
        onChange={handleChangeRoom}
      />
      </Box>
      <Box sx={{m: 2, display: 'inline'}}>
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
      </Box></>:<></>}
      
       <Box sx={{m: 2, display: 'inline'}}>
    <FormControl sx={{width:500}}>
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        College 
      </InputLabel>
      <NativeSelect
      defaultValue= {chooseCol}
      onChange={handleChangeCollege}
      >
        {college.map((col,index)=>(<option key={col}value={col}>{col}</option>))}
      </NativeSelect>
    </FormControl>
      </Box><br/><br/>
      <Button  sx={{float: 'right',color: '#5D4E99'}} onClick={handleNewAddress}>
        <CheckIcon/>
        save
      </Button>
      </>
    )
  }else if(chooseCol=="UC"){
    return(
      <>
      <h5 style={{color: '#5D4E99'}}>Add new address</h5><br/>
       {chooseCol?<><Box sx={{m: 2, display: 'inline'}}>
      <TextField
        id="standard-required"
        label="Room"
        variant="standard"
        onChange={handleChangeRoom}
      />
      </Box>
      <Box sx={{m: 2, display: 'inline'}}>
    <FormControl >
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        UC Hostel
      </InputLabel>
      <NativeSelect
      defaultValue= {chooseCol}
      onChange={handleChangeBuilding}
      >
        {ucHall.map((col,index)=>(<option value={ucHall[index]}>{ucHall[index]}</option>))}
      </NativeSelect>
    </FormControl>
      </Box></>:<></>}
      
       <Box sx={{m: 2, display: 'inline'}}>
    <FormControl sx={{width:500}}>
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        College 
      </InputLabel>
      <NativeSelect
      onChange={handleChangeCollege}
      >
        {college.map((col,index)=>(<option key={col}value={col}>{col}</option>))}
      </NativeSelect>
    </FormControl>
      </Box><br/><br/>
      <Button  sx={{float: 'right',color: '#5D4E99'}} onClick={handleNewAddress}>
        <CheckIcon/>
        save
      </Button>
      </>
    )
  }else if(chooseCol=="SHAW"){  
    return(
      <>
      <h5 style={{color: '#5D4E99'}}>Add new address</h5><br/><Box sx={{m: 2, display: 'inline'}}>
      <TextField
        id="standard-required"
        label="Room"
        variant="standard"
        onChange={handleChangeRoom}
      />
      </Box>
      <Box sx={{m: 2, display: 'inline'}}>
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
      
       <Box sx={{m: 2, display: 'inline'}}>
    <FormControl sx={{width:500}}>
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        College 
      </InputLabel>
      <NativeSelect
      defaultValue= {chooseCol}
      onChange={handleChangeCollege}
      >
        {college.map((col,index)=>(<option key={col}value={col}>{col}</option>))}
      </NativeSelect>
    </FormControl>
      </Box><br/><br/>
      <Button  sx={{float: 'right',color: '#5D4E99'}} onClick={handleNewAddress}>
        <CheckIcon/>
        save
      </Button>
      </>
    )
  }else if(chooseCol=="Other Hostel"){
    return(
      <>
      <h5 style={{color: '#5D4E99'}}>Add new address</h5><br/>
      <Box sx={{m: 2, display: 'inline'}}>
      <TextField
        id="standard-required"
        label="Room, Block"
        variant="standard"
        onChange={handleChangeRoom}
      />
      </Box>
      <Box sx={{m: 2, display: 'inline'}}>
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
      
       <Box sx={{m: 2, display: 'inline'}}>
    <FormControl sx={{width:500}}>
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        College 
      </InputLabel>
      <NativeSelect
      defaultValue={chooseCol}
      onChange={handleChangeCollege}
      >
        {college.map((col,index)=>(<option key={col}value={col}>{col}</option>))}
      </NativeSelect>
    </FormControl>
      </Box><br/><br/>
      <Button  sx={{float: 'right',color: '#5D4E99'}} onClick={handleNewAddress}>
        <CheckIcon/>
        save
      </Button>
      </>
    )
  }else if(chooseCol=="MS"){  
    return(
      <>
      <h5 style={{color: '#5D4E99'}}>Add new address</h5><br/>
      <Box sx={{m: 2, display: 'inline'}}>
      <TextField
        id="standard-required"
        label="Room"
        variant="standard"
        onChange={handleChangeRoom}
      />
      </Box>
      <Box sx={{m: 2, display: 'inline'}}>
    <FormControl >
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        MS Hostel
      </InputLabel>
      <NativeSelect
      onChange={handleChangeBuilding}
      >
        {msHall.map((col,index)=>(<option value={msHall[index]}>{msHall[index]}</option>))}
      </NativeSelect>
    </FormControl>
      </Box>
      
       <Box sx={{m: 2, display: 'inline'}}>
    <FormControl sx={{width:500}}>
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        College 
      </InputLabel>
      <NativeSelect
      defaultValue= {chooseCol}
      onChange={handleChangeCollege}
      >
        {college.map((col,index)=>(<option key={col}value={col}>{col}</option>))}
      </NativeSelect>
    </FormControl>
      </Box><br/><br/>
      <Button  sx={{float: 'right',color: '#5D4E99'}} onClick={handleNewAddress}>
        <CheckIcon/>
        save
      </Button>
      </>
    )
  }else if(chooseCol=="SH"){  
    return(
      <>
      <h5 style={{color: '#5D4E99'}}>Add new address</h5><br/>
     <Box sx={{m: 2, display: 'inline'}}>
      <TextField
        id="standard-required"
        label="Room"
        variant="standard"
        onChange={handleChangeRoom}
      />
      </Box>
      <Box sx={{m: 2, display: 'inline'}}>
    <FormControl >
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        SH Hostel
      </InputLabel>
      <NativeSelect
      onChange={handleChangeBuilding}
      >
        {shHall.map((col,index)=>(<option value={shHall[index]}>{shHall[index]}</option>))}
      </NativeSelect>
    </FormControl>
      </Box>
      
       <Box sx={{m: 2, display: 'inline'}}>
    <FormControl sx={{width:500}}>
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        College 
      </InputLabel>
      <NativeSelect
      defaultValue = {chooseCol}
      onChange={handleChangeCollege}
      >
        {college.map((col,index)=>(<option key={col}value={col}>{col}</option>))}
      </NativeSelect>
    </FormControl>
      </Box><br/><br/>
      <Button  sx={{float: 'right',color: '#5D4E99'}} onClick={handleNewAddress}>
        <CheckIcon/>
        save
      </Button>
      </>
    )
  }else if(chooseCol=="WS"){  
    return(
      <>
      <h5 style={{color: '#5D4E99'}}>Add new address</h5><br/>
       <Box sx={{m: 2, display: 'inline'}}>
      <TextField
        id="standard-required"
        label="Room"
        variant="standard"
        onChange={handleChangeRoom}
      />
      </Box>
      <Box sx={{m: 2, display: 'inline'}}>
    <FormControl >
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        WS Hostel
      </InputLabel>
      <NativeSelect
      onChange={handleChangeBuilding}
      >
        {wsHall.map((col,index)=>(<option value={wsHall[index]}>{wsHall[index]}</option>))}
      </NativeSelect>
    </FormControl>
      </Box>
      
       <Box sx={{m: 2, display: 'inline'}}>
    <FormControl sx={{width:500}}>
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        College 
      </InputLabel>
      <NativeSelect
      defaultValue={chooseCol}
      onChange={handleChangeCollege}
      >
        {college.map((col,index)=>(<option key={col}value={col}>{col}</option>))}
      </NativeSelect>
    </FormControl>
      </Box><br/><br/>
      <Button  sx={{float: 'right',color: '#5D4E99'}} onClick={handleNewAddress}>
        <CheckIcon/>
        save
      </Button>
      </>
    )
  }else if(chooseCol=="WYS"){  
    return(
      <>
      <h5 style={{color: '#5D4E99'}}>Add new address</h5><br/>
       <Box sx={{m: 2, display: 'inline'}}>
      <TextField
        id="standard-required"
        label="Room"
        variant="standard"
        onChange={handleChangeRoom}
      />
      </Box>
      <Box sx={{m: 2, display: 'inline'}}>
    <FormControl >
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        WYS Hostel
      </InputLabel>
      <NativeSelect
      onChange={handleChangeBuilding}
      >
        {wysHall.map((col,index)=>(<option value={wysHall[index]}>{wysHall[index]}</option>))}
      </NativeSelect>
    </FormControl>
      </Box>
      
       <Box sx={{m: 2, display: 'inline'}}>
    <FormControl sx={{width:500}}>
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        College 
      </InputLabel>
      <NativeSelect
      defaultValue={chooseCol}
      onChange={handleChangeCollege}
      >
        {college.map((col,index)=>(<option key={col}value={col}>{col}</option>))}
      </NativeSelect>
    </FormControl>
      </Box><br/><br/>
      <Button  sx={{float: 'right',color: '#5D4E99'}} onClick={handleNewAddress}>
        <CheckIcon/>
        save
      </Button>
      </>
    )
  }else if(chooseCol=="CW"){  
    return(
      <>
      <h5 style={{color: '#5D4E99'}}>Add new address</h5><br/>
       <Box sx={{m: 2, display: 'inline'}}>
      <TextField
        id="standard-required"
        label="Room"
        variant="standard"
        onChange={handleChangeRoom}
      />
      </Box>
       <Box sx={{m: 2, display: 'inline'}}>
    <FormControl sx={{width:500}}>
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        College 
      </InputLabel>
      <NativeSelect
      defaultValue={chooseCol}
      onChange={handleChangeCollege}
      >
        {college.map((col,index)=>(<option key={col}value={col}>{col}</option>))}
      </NativeSelect>
    </FormControl>
      </Box><br/><br/>
      <Button  sx={{float: 'right',color: '#5D4E99'}} onClick={handleNewAddress}>
        <CheckIcon/>
        save
      </Button>
      </>
    )
  }
    
}

// PROGRAM Account To display account information and allow user edit
// CALLING SEQUENCE: Profile->ProfileHeader->Account
// PROGRAMMER: Ng Wing Ki Vickie
// Version 1.0 : 31-3-2022
// PURPOSE: Allow user to check and update the account information and call change password function if needed
// DATA STRUCTURE
//   Variable show - Boolean
//   Variable username - STRING
//   Variable newUsername - STRING
//   Variable point - FLOAT
//   Variable email- STRING
//   Variable fname - STRING
//   Variable lname - STRING
//   Variable phone - STRING
//   Variable college - STRING
//   Variable faculty - STRING
//   Variable gender - STRING
//   Variable fetchFinish - BOOLEAN
//   Variable unique - BOOLEAN
//   Variable colleges - ARRAY
//   Variable faculties - ARRAY
//   Variable genders - ARRAY
//   Variabel user - STRING
// ALGORITHM:
// 1. fetch account information
// 2. fetchFinish then show all account info in corresponding fields
// 3. if any changes in fields, save to corresponding variables
// 4. click the tick button to save all information and reload the page
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
  const [user, setUser] = useState("");

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
  setNewUsername(event.target.value);
}

const handleChangePhone = (event)=>{
  setPhone(event.target.value)
}

  useEffect(()=>{
    setUser(localStorage.getItem('user'));
    console.log("set!",user);
    if(fetchFinish == false){
   fetch('/dbAccount/getByUID/'+user)
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
    const res = await fetch('/dbAccount/userName/' + username);
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
const navigate = useNavigate();
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
    fetch('/dbAccount/userName/' + newUsername)
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
  fetch('/dbAccount/updateAccount/'+user, { //saving to database
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
  fetch('/dbAccount/updateAccount/'+user, { //saving to database
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
    return( <p>loading</p> )
  } else {
   return(
     <>
      <div style={{width:'70%', margin:'auto'}}>
      <Button 
          size="small" 
          onClick={()=>navigate(-1)}
          sx={{bgcolor: "transparent", color: '#5D4E99', ':hover': {bgcolor:'transparent', color: '#5D4E99'}}}
        >
          <ArrowBackIosIcon/>
        </Button>
     <IconButton sx={{float: 'right',color: '#5D4E99'}} onClick={updateInfo}><DoneIcon/></IconButton><br/>
     <h3 style={{color: '#5D4E99'}}>Peronal Information</h3><br/>
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
     <FormDialog email={email}/>
     </div>
     </>
   );}
}

// PROGRAM FormDialog A popup for entering information to change password
// CALLING SEQUENCE: Login as Customer -> Profile -> ProfileHeader-> Account ->Change Password
// PROGRAMMER: Ng Wing Ki Vickie
// VERSION 1.0: 31-3-2022
// Purpose: For user to change their password
// DATA STRUCTURE
//   Variable open - BOOLEAN
//   Variable anchorEl - BOOLEAN
//   Variable oldpw - STRING
//   Variable pw1 -STRING
//   Variable pw2 - STRING
//   Variable submitValid - BOOLEAN
//   Variable veri - BOOLEAN
//   Variable pw - STRING
//   Variable user - STRING
// Algorithm
// 1. enter current password
// 2. enter new password
// 3. re-enter new password
// 4. if current passoword correct && two new password is identical, changes saved, pop up close
// 5. else pop up error message
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
    if (pw1!=pw2){
      window.alert("password and confirm password does not match.");
      return;
    }
    if(veri==false){
      window.alert("wrong password, please enter again.");
      return;
    }else{
      fetch('/dbAccount/updatePw/'+ props.email, { 
      method: 'POST', 
      body: new URLSearchParams({
          "password": pw2
      })  
    })
    .then(()=>{
              setOld("");
              setPw1("");
              setPw2("");
              return;
    })
    .catch(err=>console.log(err))
    window.alert("Changes saved");
    setOpen(false);
    setAnchorEl(null);
      }
    
    };

  useEffect(()=>{
    if(localStorage.getItem('user') != ""){
      setUser(localStorage.getItem('user'));
      console.log("set!",user);
  }
    if(oldpw!="" && pw1!="" && pw2!=""){
      setSubmit(true);
    }else{
      setSubmit(false);
    }
    if(oldpw==""){
      fetch('/dbAccount/getByUID/'+ user)
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
      <Button sx={{border: 2,bgcolor: '#transparent', color: '#5D4E99', ':hover': {borderColor: '#5D4E99', bgcolor: '#5D4E99', color: '#F4CB86'}}}
      aria-owns={open ? 'simple-open' : null} aria-haspopup="true" onClick={handleClickOpen}>Change Password</Button><br/><br/>
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
// PROGRAM AdminUser To display user information
// CALLING SEQUENCE: Login as admin-> User Info
// PROGRAMMER: Ng Wing Ki Vickie
// PURPOSE: show all user information in one table
// DATA STRUCTURE
//   ARRAY columns
//   Variable userinfo - STRING
//   Variable uid - STRING
//   Variable mounted - BOOLEAN
//   Variable check - BOOLEAN
//   Variable point - FLOAT
// ALGORITHM
// 1. Fetch user info from database
// 2. Show the user list on table
// 3. Enter email address + point to change point
// 4. Enter emaill address to check user's profile 
function AdminUser(){
const columns = [
  { field: 'uid', headerName: 'ID', width:180 },
  {
    field: 'first_name',
    headerName: 'First name',
    width: 160,
    sortable: true
  },
  {
    field: 'last_name',
    headerName: 'Last name',
    width: 80,
    sortable: true
  },
  {
    field: 'user_name',
    headerName: 'username',
    type: 'number',
    width: 100,
    sortable: true
  },
  {
    field: 'point',
    headerName: 'Point',
    width: 50,
  },
  {
    field: 'phone',
    headerName: 'Phone',
    sortable: true
  },
  {
    field: 'email',
    headerName: 'email',
    width: 300,
    sortable: true
  },
  {
    field: 'verify',
    headerName: 'Verify',
    width: 50,
    sortable: true

  },
  {
    field: 'password',
    headerName: 'password',
    width: 150,
    sortable: true

  },
  {
    field: 'college',
    headerName: 'Collge',
    sortable: true
  },
  {
    field: 'faculty',
    headerName: 'Faculty',
    sortable: true
  },
  {
    field: 'gender',
    headerName: 'gender',
    sortable: true
  },
];

const [userinfo,setInfo] = useState();
const [mounted, setMounted] = useState(false);
const [uid, setuid] = useState('');
const [point, setPoint] = useState('');
const [check, setCheck] = useState(false);
const handleChangeuid = (event)=>{
  setuid(event.target.value);
}
const handleChangePoint = (event)=>{
  setPoint(event.target.value);
}

const editPoint = ()=>{
  fetch('/dbAccount/editPoint', { 
    method: 'POST', 
    body: new URLSearchParams({
        "uid": uid,
        "newpoint": point,
    })
  })
  .then(console.log("point update"))
  .catch(err=>console.log(err))  
  window.location.reload();
  return;
}

const checkProfile = () =>{
  localStorage.setItem('check',uid);
  setCheck(true);
}
const uncheckProfile = () =>{
  localStorage.setItem('check',"");
  setuid("");
  setCheck(false);
}
if(!mounted){
  
  fetch('/dbAccount/getAll')
  .then(res=>res.json())
  .then(data=>{
   setInfo(data);
   setMounted(true);
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
    <>
    <h1>User List</h1>
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        getRowId={rows => rows._id}
        rows={userinfo}
        columns={columns}
        pagination
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableColumnFilter
      />
    </div>
    <Grid
      container
      spacing={2}
    >
    <Grid item xs={6}>
          <Card sx={{width: 500, m:3}}>
            <CardContent>
              <Typography variant="h5" component="div">
                Change Point
              </Typography>
            </CardContent>
            
            <CardActionArea>
              <TextField
                id="standard-required"
                label="UID"
                sx ={{m:3, x:5}}
                variant="standard"
                onChange={handleChangeuid}
              />
              <TextField
                id="standard-required"
                label="Update Point"
                value={point}
                sx ={{m:3, x:5}}
                variant="standard"
                onChange={handleChangePoint}
              />
          </CardActionArea>
          <CardActions>
            <Button onClick={editPoint} sx={{float: 'right'}}>
              Edit Point
            </Button>
          </CardActions>
          </Card>
        </Grid>
      <Grid item xs={6}>
          <Card sx={{width: 500, m:3, l:10}}>
          <CardContent>
              <Typography variant="h5" component="div">
                Check Profile
              </Typography>
            </CardContent>
            <CardActionArea>
            <TextField
            id="standard-required"
            label="UID"
            sx ={{m:3, x:5}}
            variant="standard"
            onChange={handleChangeuid}
          />
          </CardActionArea>
          <CardActions>
            {check==true?<Button onClick={uncheckProfile} sx={{float: 'right'}}>Close</Button>:<Button onClick={checkProfile}>Open</Button>}
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      {check?<Profile/>:<></>}
    </>
  );
}
}

// PROGRAM ManagePw To edit password
// CALLING SEQUENCE: Login as Admin->Change Password
// PROGRAMMER: Ng Wing Ki Vickie
// VERISON: 31-3-2022
// Purpose: Allow admin change password by random password generator and entering target email address
// DATA STRUCTURE
//  Variable password - STRING
//  Variable email - STRING
//  Variable fetchFinish - BOOLEAN
//  Variable isCopied - BOOLEAN
// Algorithm
// 1. click generate password
// 2. click copy to copy the password to clipbord
// 3. paste the password and enter the target account email
function ManagePw(){
 const[password, setPassword] = useState('');
 const[email, setEmail] = useState('');
 const[fetchFinish, setFetch] = useState(false);
 const [isCopied, setIsCopied] = useState(false);
 const handleChangeEmail = (event)=>{
   setEmail(event.target.value);
 }
 const handleChangepw = (event)=>{
   setPassword(event.target.value);
 }
 const genPassword=(event)=> {
    var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var passwordLength = 12;
    var pw = "";
 for (var i = 0; i <= passwordLength; i++) {
   var randomNumber = Math.floor(Math.random() * chars.length);
   pw += chars.substring(randomNumber, randomNumber +1);
  }
  console.log(pw);
   setPassword(pw);
   return pw;
}
async function copyTextToClipboard(text) {
  if('clipboard' in navigator){
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand('copy', true, text);
  }
}

const handleCopyClick = () => {
  // Asynchronously call copyTextToClipboard
  copyTextToClipboard(password)
    .then(() => {
      // If successful, update the isCopied state value
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    })
    .catch((err) => {
      console.log(err);
    });
}

const changePw = ()=>{
  fetch('/dbAccount/updatePw/'+ email, { 
    method: 'POST', 
    body: new URLSearchParams({
        "password": password
    })
  })
  .then(console.log("delete"))
  .catch(err=>console.log(err))  
  window.location.reload();
  return;
}

  return(
    <>
    <Card sx={{width: 500, m:3}}>
    <CardContent>
      <Typography variant="h5" component="div">
        Password Generator
      </Typography>
    </CardContent>
    <TextField
      id="standard-read-only-input"
      label="Generate password"
      value={password}
      InputProps={{
        readOnly: true,
      }}
      sx ={{m:3, x:5}}
      variant="standard"
    />
    <br></br>
    <Button sx={{float: 'left'}} onClick={genPassword}>Generate</Button>
    <Button sx={{float: 'right'}} onClick={handleCopyClick}>Copy</Button>
    </Card>
  {/* </Grid> */}
  {/* <br></br> */}
  <Card sx={{width: 500, m:3}}>
    <CardContent>
      <Typography variant="h5" component="div">
        Change Password
      </Typography>
    </CardContent>
   
    <TextField
      id="standard-required"
      label="email"
      variant="standard"
      onChange={handleChangeEmail}
      sx={{m:2}}
    />
    <TextField
      id="standard-required"
      label="password"
      default={password}
      variant="standard"
      onChange={handleChangepw}
      sx={{m:2}}
    />
    <br></br>
    <Button onClick={changePw} sx={{float: 'right'}}>Change</Button>
  </Card>
    </>
  );
}

// PROGRAM DeleteAcc To delete account from database
// CALLING SEQUENCE: Login as Admin->Delete Account
// PROGRAMMER: NG Wing Ki Vickie
// VERSION 1.0: 12-4-2022
// Purpose: allow admin to delete strange/ not verified and abandoned accounts
// DATA STRUCTURE
//  Variable email - STRING
//  Variable fetchFinish - BOOLEAN
//  Variable acc - STRING
//  ARRAY columns
// ALGORITHM
// 1. enter the email address
// 2. delete the account
function DeleteAcc(){
  const[email, setEmail] = useState('');
  const[fetchFinish, setFetch] = useState(false);
  const[acc, setAcc] = useState('');
  const columns = [
    { field: 'uid', headerName: 'ID', width:180 },
    {
      field: 'first_name',
      headerName: 'First name',
      width: 160,
      sortable: true
    },
    {
      field: 'last_name',
      headerName: 'Last name',
      width: 80,
      sortable: true
    },
    {
      field: 'user_name',
      headerName: 'username',
      type: 'number',
      width: 100,
      sortable: true
    },
    {
      field: 'phone',
      headerName: 'Phone',
      sortable: true
    },
    {
      field: 'email',
      headerName: 'email',
      width: 300,
      sortable: true
    },
    {
      field: 'verify',
      headerName: 'Verify',
      width: 50,
      sortable: true
  
    },
  ];
  const handleChangeEmail = (event)=>{
    setEmail(event.target.value);
  }
  const deleteUser = ()=>{

    fetch('/dbAccount/delete',{ 
          method: 'POST', 
          body: new URLSearchParams({
              "email": email
          })
        })
        .then(console.log("change"))
        .catch(err=>console.log(err))
        window.location.reload();
      }

  if(!fetchFinish){
    fetch('/dbAccount/getUnverify')
      .then(res=>res.json())
      .then(data=>{
        setAcc(data);
        setFetch(true);
      })
      .catch((err)=>{
        console.log(err);
        setFetch(false);
      })
  }
  useEffect(()=>{
    setFetch(true);
  })
  if(fetchFinish == false){
    return(
      <h1>loading</h1>
    );
    }else{
      return(
        <>
        <Card sx={{width: 500, m:3}}>
        <CardContent>
          <Typography variant="h5" component="div">
            Delete Account
          </Typography>
        </CardContent>
          <TextField
            id="standard-required"
            label="email"
            variant="standard"
            onChange={handleChangeEmail}
            sx={{m:2}}
          />
          <br></br>
          <Button onClick={deleteUser} sx={{float: 'right'}}>Delete</Button>
        </Card>
          <div style={{ height: 500, width: '100%' }}>
          <DataGrid
            getRowId={rows => rows._id}
            rows={acc}
            columns={columns}
            pagination
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableColumnFilter
            sx={{"& .MuiDataGrid-menuIconButton":{
              display:"none"
            }}}
          />
        </div>
        </>

  );}
}


export { Profile, Account, Address, AdminUser, AddNewAddress, ManagePw, DeleteAcc, RestaurantProfile};