import React, {useEffect, useState, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from './UserContext';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid  } from '@mui/x-data-grid';
import{ Link, Box, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, TextField, 
  InputLabel, Input, FormControl, NativeSelect, IconButton, Avatar } from '@mui/material';

// const Styles = styled.div`
// padding: 1rem;

// table {
//   border-spacing: 0;
//   border: 1px solid black;

//   tr {
//     :last-child {
//       td {
//         border-bottom: 0;
//       }
//     }
//   }

//   th,
//   td {
//     margin: 0;
//     padding: 0.5rem;
//     border-bottom: 1px solid black;
//     border-right: 1px solid black;

//     :last-child {
//       border-right: 0;
//     }
//   }
// }
// `
let userInfo = [];

function Profile(){
  const {user, setUser} = useContext(UserContext);
  const[username,setUsername] = useState('');
  const[email,setEmail] = useState('0.0@link.cuhk.edu.hk');
  const[point,setPoint] = useState(-1);
  const[pic, setPic] = useState('');
  const[fetchFinish, setFetch] = useState(false);

  useEffect(()=>{
    if(fetchFinish== false){
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
    })}
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
                              <Button  href="/record" variant="outlined" sx={{bgcolor: '#5D4E99',color: "#F4CB86"}}>
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
  const navigate = useNavigate();
  function deleteAdd(address){
    fetch('http://localhost:7000/dbAccount/delAddress/'+user, { 
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
    if(fetchFinish == false){
    fetch('http://localhost:7000/dbAccount/getAddress/'+user)
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
      <h1>loading</h1>
    )
  }
  if(fetchFinish == true){
    return(
      <>
      <Button 
          size="small" 
          onClick={()=>navigate(-1)}
          sx={{bgcolor: "transparent", color: '#5D4E99', ':hover': {bgcolor:'transport', color: '#5D4E99'}}}
        >
          <ArrowBackIosIcon/>
        </Button><br/><br/>
      <div style={{width:'80%', margin:'auto', maxWidth:800}}>
        {savedAddress.map((address, index)=>(
          <>
          <h5>Address {index+1}</h5>
          <IconButton sx={{float: 'right',color: '#5D4E99'}} onClick={()=>deleteAdd(address)}><DeleteIcon/></IconButton>
          <p key={address}>{address}</p>
          <br></br>
          </>
        ))}
        <AddNewAddress email={email}/>
      </div>
      </>
    )
    }
}

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

  const handleChangeRoom = (event)=>{
    setRoom(event.target.value);
    console.log(event.target.value);
  }

  const handleChangeCollege=(event)=>{
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
    fetch('http://localhost:7000/dbAccount/addAddress/'+user, { 
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

  if(chooseCol=="Other Building"||chooseCol == ""){
    return(
      <>
        <h5>Add new address</h5>
         {chooseCol?<><Box sx={{ m: 5 ,display: 'inline'}}>
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
        </Box></>:<></>}
        
         <Box sx={{ m: 5 ,display: 'inline'}}>
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
      <h5>Add new address</h5>
       {chooseCol?<><Box sx={{ m: 5 ,display: 'inline'}}>
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
      </Box></>:<></>}
      
       <Box sx={{ m: 5 ,display: 'inline'}}>
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
      </Box>
      <Button  sx={{float: 'right',color: '#5D4E99'}} onClick={handleNewAddress} disable={!valid}>
        <CheckIcon/>
        save
      </Button>
      </>
    )
  }else if(chooseCol=="NA"){
    return(
      <>
      <h5>Add new address</h5>
       {chooseCol?<><Box sx={{ m: 5 ,display: 'inline'}}>
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
      </Box></>:<></>}
      
       <Box sx={{ m: 5 ,display: 'inline'}}>
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
      </Box>
      <Button  sx={{float: 'right',color: '#5D4E99'}} onClick={handleNewAddress}>
        <CheckIcon/>
        save
      </Button>
      </>
    )
  }else if(chooseCol=="UC"){
    return(
      <>
      <h5>Add new address</h5>
       {chooseCol?<><Box sx={{ m: 5 ,display: 'inline'}}>
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
      defaultValue= {chooseCol}
      onChange={handleChangeBuilding}
      >
        {ucHall.map((col,index)=>(<option value={ucHall[index]}>{ucHall[index]}</option>))}
      </NativeSelect>
    </FormControl>
      </Box></>:<></>}
      
       <Box sx={{ m: 5 ,display: 'inline'}}>
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
      </Box>
      <Button  sx={{float: 'right',color: '#5D4E99'}} onClick={handleNewAddress}>
        <CheckIcon/>
        save
      </Button>
      </>
    )
  }else if(chooseCol=="SHAW"){  
    return(
      <>
      <h5>Add new address</h5><Box sx={{ m: 5 ,display: 'inline'}}>
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
        College 
      </InputLabel>
      <NativeSelect
      defaultValue= {chooseCol}
      onChange={handleChangeCollege}
      >
        {college.map((col,index)=>(<option key={col}value={col}>{col}</option>))}
      </NativeSelect>
    </FormControl>
      </Box>
      <Button  sx={{float: 'right',color: '#5D4E99'}} onClick={handleNewAddress}>
        <CheckIcon/>
        save
      </Button>
      </>
    )
  }else if(chooseCol=="Other Hostel"){
    return(
      <>
      <h5>Add new address</h5>
       <Box sx={{ m: 5 ,display: 'inline'}}>
      <TextField
        id="standard-required"
        label="Room, Block"
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
        College 
      </InputLabel>
      <NativeSelect
      defaultValue={chooseCol}
      onChange={handleChangeCollege}
      >
        {college.map((col,index)=>(<option key={col}value={col}>{col}</option>))}
      </NativeSelect>
    </FormControl>
      </Box>
      <Button  sx={{float: 'right',color: '#5D4E99'}} onClick={handleNewAddress}>
        <CheckIcon/>
        save
      </Button>
      </>
    )
  }else if(chooseCol=="MS"){  
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
        MS Hostel
      </InputLabel>
      <NativeSelect
      onChange={handleChangeBuilding}
      >
        {msHall.map((col,index)=>(<option value={msHall[index]}>{msHall[index]}</option>))}
      </NativeSelect>
    </FormControl>
      </Box>
      
       <Box sx={{ m: 5 ,display: 'inline'}}>
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
      </Box>
      <Button  sx={{float: 'right',color: '#5D4E99'}} onClick={handleNewAddress}>
        <CheckIcon/>
        save
      </Button>
      </>
    )
  }else if(chooseCol=="SH"){  
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
        SH Hostel
      </InputLabel>
      <NativeSelect
      onChange={handleChangeBuilding}
      >
        {shHall.map((col,index)=>(<option value={shHall[index]}>{shHall[index]}</option>))}
      </NativeSelect>
    </FormControl>
      </Box>
      
       <Box sx={{ m: 5 ,display: 'inline'}}>
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
      </Box>
      <Button  sx={{float: 'right',color: '#5D4E99'}} onClick={handleNewAddress}>
        <CheckIcon/>
        save
      </Button>
      </>
    )
  }else if(chooseCol=="WS"){  
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
        WS Hostel
      </InputLabel>
      <NativeSelect
      onChange={handleChangeBuilding}
      >
        {wsHall.map((col,index)=>(<option value={wsHall[index]}>{wsHall[index]}</option>))}
      </NativeSelect>
    </FormControl>
      </Box>
      
       <Box sx={{ m: 5 ,display: 'inline'}}>
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
      </Box>
      <Button  sx={{float: 'right',color: '#5D4E99'}} onClick={handleNewAddress}>
        <CheckIcon/>
        save
      </Button>
      </>
    )
  }else if(chooseCol=="WYS"){  
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
        WYS Hostel
      </InputLabel>
      <NativeSelect
      onChange={handleChangeBuilding}
      >
        {wysHall.map((col,index)=>(<option value={wysHall[index]}>{wysHall[index]}</option>))}
      </NativeSelect>
    </FormControl>
      </Box>
      
       <Box sx={{ m: 5 ,display: 'inline'}}>
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
      </Box>
      <Button  sx={{float: 'right',color: '#5D4E99'}} onClick={handleNewAddress}>
        <CheckIcon/>
        save
      </Button>
      </>
    )
  }else if(chooseCol=="CW"){  
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
        College 
      </InputLabel>
      <NativeSelect
      defaultValue={chooseCol}
      onChange={handleChangeCollege}
      >
        {college.map((col,index)=>(<option key={col}value={col}>{col}</option>))}
      </NativeSelect>
    </FormControl>
      </Box>
      <Button  sx={{float: 'right',color: '#5D4E99'}} onClick={handleNewAddress}>
        <CheckIcon/>
        save
      </Button>
      </>
    )
  }
  // }else{
  //   return(
  //   <>
  //   <h5>Add new address</h5>
  //    <Box sx={{ m: 5 ,display: 'inline'}}>
  //   <TextField
  //     id="standard-required"
  //     label="Room"
  //     variant="standard"
  //     onChange={handleChangeRoom}
  //   />
  //   </Box>
  //    <Box sx={{ m: 5 ,display: 'inline'}}>
  // <FormControl sx={{width:500}}>
  //   <InputLabel variant="standard" htmlFor="uncontrolled-native">
  //     College 
  //   </InputLabel>
  //   <NativeSelect
  //   onChange={handleChangeCollege}
  //   >
  //     {college.map((col,index)=>(<option key={col}value={col}>{col}</option>))}
  //   </NativeSelect>
  // </FormControl>
  //   </Box>
  //   <IconButton  sx={{float: 'right',color: '#5D4E99'}} onClick={handleNewAddress}>
  //     <CheckIcon/>
  //     save
  //   </IconButton>
  //   </>)
  // }
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
    return( <p>loading</p> )
  } else {
   return(
     <>
      <Button 
        size="small" 
        onClick={()=>navigate(-1)}
        sx={{bgcolor: "transparent", color: '#5D4E99', ':hover': {bgcolor:'transport', color: '#5D4E99'}}}
      >
        <ArrowBackIosIcon/>
      </Button><br/><br/>
      <div style={{width:'80%', margin:'auto', maxWidth:800}}>
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
     </div>
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
      fetch('http://localhost:7000/dbAccount/updatePw/'+ props.email, { 
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
// update pw
const deleteUser = ()=>{

fetch('http://localhost:7000/dbAccount/delete',{ 
      method: 'POST', 
      body: new URLSearchParams({
          "email": email
      })
    })
    .then(console.log("change"))
    .catch(err=>console.log(err))
    window.location.reload();
  }

const changePw = ()=>{
    fetch('http://localhost:7000/dbAccount/updatePw/'+ email, { 
      method: 'POST', 
      body: new URLSearchParams({
          "password": pw
      })
    })
    .then(console.log("delete"))
    .catch(err=>console.log(err))  
    window.location.reload();
    return;
  }

const [userinfo,setInfo] = useState();
const [mounted, setMounted] = useState(false);
const [email, setEmail] = useState('');
const [pw, setPw] = useState('');
const handleChangeEmail = (event)=>{
  setEmail(event.target.value);
}
const handleChangePassword = (event)=>{
  setPw(event.target.value);
}
if(!mounted){
  fetch('http://localhost:7000/dbAccount/getAll')
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
    // <AdminTable row={userinfo} col={columns}/>
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
        sx={{"& .MuiDataGrid-menuIconButton":{
          display:"none"
        }}}
      />
    </div>
    <Box sx={{ m: 5 ,display: 'inline'}}>
    <TextField
      id="standard-required"
      label="email"
      variant="standard"
      onChange={handleChangeEmail}
    />
    <TextField
      id="standard-required"
      label="password"
      variant="standard"
      onChange={handleChangePassword}
    />
    </Box>
    <Button onClick={deleteUser}>delete</Button>
    <Button onClick={changePw}>update</Button>
    </>
  );
}
}

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
  fetch('http://localhost:7000/dbAccount/updatePw/'+ email, { 
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
  {/* <Grid> */}
  {/* <Box sx={{display: 'inline'}}> */}
    <Card sx={{width: 500, m:3}}>
    <h1>Password Generator</h1>
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
    <h1>Change Password</h1>
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
  {/* </Box> */}
    {/* <List>
      <ListItem>email1</ListItem>
    </List> */}
    </>
  );
}

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

    fetch('http://localhost:7000/dbAccount/delete',{ 
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
    fetch('http://localhost:7000/dbAccount/getUnverify')
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
          <h1>Delete Account</h1>
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


export { Profile, Account, Address, AdminUser, AddNewAddress, ManagePw, DeleteAcc};