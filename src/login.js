import React, {useEffect} from 'react';
import './login.css';
import  ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import{
    Box,
    Button,
    Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText,
    InputLabel,
    FormControl,
    NativeSelect,
    Snackbar,
    Alert
  } from '@mui/material';

// PROGRAM LoginPage
// CALLING SEQUENCE Click login button on the navigation bar
// PROGRAMMER: PAU Chun Wai
// Purpose: call check email
// VERSION 1.0: 3-3-2022
function LoginPage(){
    return( 
        <div className="body">
            
            <div id="Component">
                <CheckEmail />   
            </div>            
        </div>
    );
}

// PROGRAM CheckEmail
// CALLING PROCEDURE: Login->CheckEmail
// Purpose: User can type in their email to know if they registered or not, then process login with password or registration.
// PROGRAMMER: LAM Yan Yu, NG Wing Ki Vickie, PAU Chun Wai
// VERSION 1.0: 8-3-2022
// REVISION 1.1: 26-3-2022 add api
// DATA STRUCTURE
// Variable email -STRING
// Variable pass -BOOLEAN
// ALGORITHM
// 1.  verify email
// 2.  call api check database exist this email or not
// 3. direct to login/ registration
function CheckEmail(){
    const [email,setEmail]=React.useState("");
    const [pass,setPass]=React.useState(false);
    const handleChange=(event)=>{
        setEmail(event.target.value);
    }
    const checkEmail=(event)=>{
        let regex = new RegExp('[a-z0-9]+@+[a-z0-9]+.cuhk.edu.hk');
        let register = false;
        let withpw = false;
        if(regex.test(email)==false || email==""){
            console.log("false email!");
        }else{
            fetch('/dbAccount/exist/'+email)
            .then((res)=>
                res.json()
            )
            .then(db=>{
                console.log(db);
                console.log(typeof(db.email));
                if (db.email=="true"){
                    withpw = true;
                    console.log(withpw);
                    }
                else{
                    register = true;
                    console.log(register);
                }
            })
            .then(()=> ReactDOM.render(<div>
                {register && <Register email={email}/>}
                {withpw && <LoginWithPassword email={email}/>}
            </div>,document.getElementById('Component')))
            .catch((err)=>{console.log(err)});
            
        }
    }
    return(
        <>
      
            <div id="login-email" className="login-container">
                <section className="shadow-lg bg-white border border-4 rounded p-2 p-lg-4" style={{borderColor: '#5D4E99 !important'}}> 
                    <h2>Enter you email</h2>
                    <h6 className="text-muted">We&apos;ll check whether your account already exists :)</h6>
                    <br/>
                    <form className="text-secondary">
                        <div className="mb-3">
                            <input type="email" className="form-control" value={email} onChange={handleChange} id="user-email" placeholder="e.g. name@example.com" required></input>
                        </div>
                        <br/>
                        <button type="button" id="email-continue" className="btn  text-white" style={{backgroundColor: '#5D4E99'}} onClick={checkEmail}>Continue</button>
                    </form>
                </section>
            </div>

        </>
        
    );
    
}
// PROGRAM EmailVerification
// CALLING SEQUENCE: click the verification link in email(send when register or forget password)
// Purpose: Verify the account
// PROGRAMMER: PAU Chun Wai
// VERSION: 12-4-2022
// DATA STRUCTURE
// Variable loadFinish
// ALGORITHM
// 1. fetch verify account api
// 2. if the account exist, change the account status, direct to homepage with login status
// 3. if not exist, error page
function EmailVerification(){
    let info=[];
    const [loadFinish, setLoadFinish]=React.useState(false)
    let param=useParams();
    useEffect(()=>{
        fetch('/verify/verifyAccount/'+param.token)
        .then((res)=>res.json())
        .then(db=>{
            info=db;
            console.log(info)
        })
        .then(()=>{
            if(info.length==0){
                window.location.assign("/NotFound")
            }else{
                localStorage.setItem('user',info[0].uid);
                localStorage.setItem('type',info[0].type);
                localStorage.setItem('name', info[0].user_name); 
                setLoadFinish(true);
                setTimeout(()=>{
                    window.location.assign("/")
                },5000);
            }
        })
    })
    if(loadFinish==false)return<>please wait</>
    else return(
        <div id="login-password" className="login-container" >
            <section id="passwordChanger" className="shadow-lg bg-white border border-4 rounded p-2 p-lg-4" style={{borderColor: "#5D4E99 !important"}}> 
                <h2>Email Verification</h2>
                <br/>
                <h4>Welcome back, {localStorage.getItem("name")}</h4>
                <h5>You was verified and will be redirected to homepage within 5 seconds</h5>
                <Link to="/">Click here if no response after 5 seconds</Link>
            </section>
        </div>
    )
        
            
}
    
// PROGRAM ChangePassword
// CALLING SEQUENCE: Login->check email->login with password->forget password->click the verification link in email
// Purpose: Forget password user can reset password by themselves
// PROGRAMMER: LAM Yan Yu,PAU Chun Wai
// VERSION: 12-4-2022
// DATA STRUCTURE
// Variable passowrd1 -STRING
// Variable passowrd2 -STRING
// Variable iconA - STRING
// Variable iconB - STRING
// Variable iconC - STRING
// Variable iconD - STRING
// Variable email - STRING
// Variable loadFinish -BOOLEAN
// Algorithm
// 1. input new password twice
// 2. if the passwords are identical, update password
// 3. redirect to home page
function ChangePassword(props){
    const [password1, setPassword1]=React.useState("");
    const [password2, setPassword2]=React.useState("");
    const [iconA, setIconA]=React.useState("none");
    const [iconB, setIconB]=React.useState("block");
    const [iconC, setIconC]=React.useState("none");
    const [iconD, setIconD]=React.useState("block");
    const [loadFinish, setLoadFinish]=React.useState("false")
    let email;
    let param=useParams();
    useEffect(()=>{
        fetch('/verify/changePassword/'+param.pwToken)
        .then((res)=>res.json())
        .then(db=>email=db.email)
        .then(()=>{
            console.log(email);
            setTimeout(setLoadFinish(true),2000);
        })
    })
    

    const handleChange1=(event)=>{
        setPassword1(event.target.value);
    }
    const handleChange2=(event)=>{
        setPassword2(event.target.value);
    }
    const viewPassword1=(event)=>{
        let passwordInput = document.getElementById('user-pw');
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            passwordInput.setAttribute('aria-label',
              'Hide password.');
              console.log("hi");
              setIconA("block");
              setIconB("none");
            
            
          } else {
              passwordInput.type = 'password';
              passwordInput.setAttribute('aria-label',
              'Show password as plain text. ' +
              'Warning: this will display your password on the screen.');
              setIconA("none");
              setIconB("block");
          }
    }
    const viewPassword2=(event)=>{
        let passwordInput = document.getElementById('user-pw');
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            passwordInput.setAttribute('aria-label',
              'Hide password.');
              console.log("hi");
              setIconC("block");
              setIconD("none");
            
            
          } else {
              passwordInput.type = 'password';
              passwordInput.setAttribute('aria-label',
              'Show password as plain text. ' +
              'Warning: this will display your password on the screen.');
              setIconC("none");
              setIconD("block");
          }
    }
    const submit=()=>{
        fetch('/dbAccount/changePW/',{
            method: 'POST', 
            body: new URLSearchParams({
                "email":email,
                "password":password1
            })  
        }).then(()=>{
            let para=document.createElement('h4');
            let node= document.createTextNode('You have successfully changed the password')
            para.appendChild(node);
            document.getElementById("passwordChangerContent").remove()
            document.getElementById("passwordChanger").appendChild(para);
            para=document.createElement('h4');
            node= document.createTextNode('You will be redirected to the login page within 5 seconds')
            para.appendChild(node);
            document.getElementById("passwordChanger").appendChild(para);
            
            setTimeout(()=>{
                
                window.location.assign("/login")

            },5000)
        })
    }

    // const reset = ()=>{

    // }
    if(loadFinish==false)return <>please wait</>
    else return(
        <>
        <div id="login-password" className="login-container" >
            <section id="passwordChanger" className="shadow-lg bg-white border border-4 rounded p-2 p-lg-4" style={{borderColor: "#5D4E99 !important"}}> 
                <h2>Change New Password</h2>
                <br/>
                <form className="text-secondary" id="passwordChangerContent">
                    <div className="mb-3" >
                        <label for="new-comment" className="form-label">Enter your new password</label>
                        <div className="input-group">
                            <input type="password" className="form-control" value={password1} onChange={handleChange1} id="user-pw" placeholder="password" required></input>
                            <button type="button" className="btn btn-secondary" onClick={viewPassword1}>
                                <i className="bi bi-eye-slash-fill icon" style={{display: iconB }}></i>
                                <i className="bi bi-eye-fill icon" style={{display: iconA }}></i>
                            </button>
                        </div>
                        <label for="new-comment" className="form-label">Enter your new password again</label>
                        <div className="input-group">
                            <input type="password" className="form-control" value={password2} onChange={handleChange2} id="user-pw" placeholder="password" required></input>
                            <button type="button" className="btn btn-secondary" onClick={viewPassword2}>
                                <i className="bi bi-eye-slash-fill icon" style={{display: iconD }}></i>
                                <i className="bi bi-eye-fill icon" style={{display: iconC }}></i>
                            </button>
                        </div>
                    </div>
                    <br/>
                    <button type="button" className="btn text-white" onClick={submit} style={{backgroundColor: "#5D4E99"}} >Submit</button>
                </form>
            </section>
        </div>

        </>
    );
}

// PROGRAM LoginWithPassword
// CALLING SEQUENCE Login->check email(account exist)->LoginWithPassword
// PURPOSE: login with password 
// PROGRAMMER: LAM Yan Yu, NG Wing Ki Vickie, PAU Chun Wai
// VERSION 1.0: 3-3-2022
// REVISION: 23-3-2022 fix the icon bug
// REVISION: 28-3-2022 add api

// DATA STRUCTURE
// Variable email - STRING
// Variable password - STRING
// Variable iconA - STRING
// Variable iconB - STRING
// Variable uid - STRING
// Variable name - STRING
// Variable type - STRING
// Variable target - STRING
// Variable fetchFinish - BOOLEAN
// Variable open - BOOLEAN
// Variable wrongPw - BOOLEAN
// Algorithm
// 1. fetch account information with email
// 2. check if the input password correct
// 3. viewPassword changes the visibility of the password
// 4. if correct input, set local storage to identify user and direct to homepage
function LoginWithPassword(props){
    const [email, setEmail]=React.useState(props.email);
    const [password, setPassword]=React.useState("");
    const [iconA, setIconA]=React.useState("none");
    const [iconB, setIconB]=React.useState("block");
    const [uid, setUID] = React.useState(null);
    const [name, setName] = React.useState(null);
    const [type, setType] = React.useState(null);
    const [target,setTarget] = React.useState(null);
    const [fetchFinish, setFetch] = React.useState(false);
    const [open, setOpen]=React.useState(false);
    const [wrongPw, setWrong] = React.useState(false);
    const handleChange=(event)=>{
        setPassword(event.target.value);
    }
    const viewPassword=(event)=>{
        let passwordInput = document.getElementById('user-pw');
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            passwordInput.setAttribute('aria-label',
              'Hide password.');
              console.log("hi");
              setIconA("block");
              setIconB("none");
            
            
          } else {
              passwordInput.type = 'password';
              passwordInput.setAttribute('aria-label',
              'Show password as plain text. ' +
              'Warning: this will display your password on the screen.');
              setIconA("none");
              setIconB("block");
          }
    
    }
    const login=()=>{
        if(password===target){
            localStorage.setItem('user',uid);
            localStorage.setItem('type',type);
            localStorage.setItem('name', name);                  
            window.location.assign("/");
        }else{
            setWrong(true);
        }
        return;

    }
    const forgetPassword=()=>{
        fetch('/dbAccount/reqChangePW/',{
            method: 'POST', 
            body: new URLSearchParams({
                "email":email,
            })  
        }).then(
            ()=>setOpen(true)
        )
        
    }

    const handleClose=(event, reason)=>{
        if (reason === 'clickaway') {
            return;
          }
      
          setOpen(false);
          if(wrongPw==true){
              setWrong(false);
          }
    }

    React.useEffect(()=>{
        if(fetchFinish==false){
        fetch('/dbAccount/get/'+email)
        .then(res=>res.json())
        .then(data=>{
            if(data[0].verify != 1&& data[0].type=="user"){
                ReactDOM.render(<AskForVerification/>,document.getElementById('Component'));
            }else{
                setTarget(data[0].password);
                setUID(data[0].uid);
                setType(data[0].type);
                setName(data[0].user_name);
            }
            setFetch(true);
        })
        .catch(err=>{
            console.log(err);
            setFetch(false);
        });
    }
    })
    return(
        <>
        <div id="login-password" className="login-container" >
            <section className="shadow-lg bg-white border border-4 rounded p-2 p-lg-4" style={{borderColor: "#5D4E99 !important"}}> 
                <h2>Great to see you again!</h2>
                <h5 id="exist-email">{props.email}</h5>
                <br/>
                <form className="text-secondary">
                    <div className="mb-3">
                        <label for="new-comment" className="form-label">Enter you password to log in</label>
                        <div className="input-group">
                            <input type="password" className="form-control" value={password} onChange={handleChange} id="user-pw" placeholder="password" required></input>
                            <button type="button" className="btn btn-secondary" onClick={viewPassword}>
                                <i className="bi bi-eye-slash-fill icon" style={{display: iconB }}></i>
                                <i className="bi bi-eye-fill icon" style={{display: iconA }}></i>
                            </button>
                        </div>
                    </div>
                    <br/>
                
                    <button type="button" className="btn text-white" style={{backgroundColor: "#5D4E99"}} onClick={login} >Log in</button>
                    <small className="float-end"><Button style={{color: "#F4CB86"}} onClick={forgetPassword}>Forgot your password?</Button></small>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                            An email has been sent to your mailbox
                        </Alert>
                    </Snackbar>
                    <Snackbar open={wrongPw} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                            Wrong Password
                        </Alert>
                    </Snackbar>
                </form>
            </section>
        </div>

        </>
    );
}

const colleges =["None","CC","CW","MS","NA","SH","SHAW","UC","WS","WYS","Others"];
const faculties = ["None","Arts","Business Administration","Education","Engineering","Law","Medicine","Science","Social Science","Others"];
const genders = ["None","Male","Female","Others"];

// PROGRAM Register
// CALLING SEQUENCE: Login->checkEmail(not exist)->Register
// PURPOSE: Create Account
// PROGRAMMER: LAM Yan Yu, NG Wing Ki Vickie, PAU Chun Wai
// VERSION 1.0: 3-3-2022
// VERSION 1.1: 28-3-2022 add api
// VERSION 1.2: 29-3-2022 fix api
// VERSION 1.3: 3-4-2022 simplify the form
// VERSION 1.4: 12-4-2022 snackbar

// DATA STRUCTURE
// Variable email - STRING
// Variable pw1 - STRING
// Variable pw2 - STRING
// Variable fname -STRING
// Variable lanme - STRING
// Variable username -STRING
// Variable unique -BOOLEAN
// Variable phone -STRING
// Variable gender - STRING
// Variable faculty - STRING
// Variable college - STRING
// Variable uid - STRING
// Variable miss - STRING
// Variable test - BOOLEAN
// Variable num - BOOLEAN
// Variable diff - BOOLEAN
// Variable iconA - STRING
// Variable iconB - STRING
// Variable iconC - STRING
// Variable iconD - STRING
// Algorithm
// 1. handle filled in fields
// 2. verify if valid cuhk email
// 3. check if fill in all required fields, valid phone number, unique username, two passwords are identical
// 4. if error, pop up message to remind user
// 5. create new account and ask for email verification to activate account.
function Register(props){
    const [email,setEmail]=React.useState(props.email);
    const [pw1,setPw1]=React.useState('');
    const [pw2,setPw2]=React.useState('');
    const [fname,setFname]=React.useState('');
    const [lname,setLname]=React.useState('');
    const [username,setUsername]=React.useState('');
    const [unique,setUnique]=React.useState(false);
    const [phone,setPhone]=React.useState('');
    const [gender,setGender]=React.useState('');
    const [faculty,setFaculty]=React.useState('');
    const [college,setCollege]=React.useState('');
    const [uid,setUid]=React.useState('');
    const [iconA,setIconA]=React.useState('block');
    const [iconB,setIconB]=React.useState('none');
    const [iconC,setIconC]=React.useState('block');
    const [iconD,setIconD]=React.useState('none');
    const [miss, setMiss] = React.useState(false);
    const [test, setTest] = React.useState(false);
    const [num, setNum] = React.useState(false);
    const [diff, setDiff] = React.useState(false);

      
    const handleChangeEmail=(event)=>{
        setEmail(event.target.value);
 
    }
    const handleChangeFname=(event)=>{
        setFname(event.target.value);
    }
    const handleChangeLname=(event)=>{
        setLname(event.target.value)
    }
    const handleChangeUsername=(event)=>{
        setUsername(event.target.value);
        setUid(createId());
    }
    const handleChangePw1=(event)=>{
        setPw1(event.target.value);
    }
    const handleChangePw2=(event)=>{
        setPw2(event.target.value);
    }
    const handleChangePhone=(event)=>{
        setPhone(event.target.value);
        console.log(event.target.value);
        console.log(typeof(event.target.value));
    }
    const handleChangeGender=(event)=>{
        setGender(event.target.value);
    }
    const handleChangeFaculty=(event)=>{
        setFaculty(event.target.value);
    }
    const handleChangeCollege=(event)=>{
        setCollege(event.target.value);
    }

    const viewPassword1=(event)=>{
        let passwordInput = document.getElementById('user-pw-1');
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            passwordInput.setAttribute('aria-label',
              'Hide password.');
              console.log("hi");
              setIconA("none");
              setIconB("block");
            
          } else {
            passwordInput.type = 'password';
            passwordInput.setAttribute('aria-label',
              'Show password as plain text. ' +
              'Warning: this will display your password on the screen.');
              setIconB("none");
              setIconA("block");
          }

      
    }
    const viewPassword2=(event)=>{
        let passwordInput = document.getElementById('user-pw-2');
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            passwordInput.setAttribute('aria-label',
              'Hide password.');
              console.log("hi");
              setIconC("none");
              setIconD("block");
            
          } else {
            passwordInput.type = 'password';
            passwordInput.setAttribute('aria-label',
              'Show password as plain text. ' +
              'Warning: this will display your password on the screen.');
              setIconD("none");
              setIconC("block");
          }
    
    }

    async function checkUsename() {
        try {
            const res = await fetch('/dbAccount/userName/' + username) //check if the username unique
                ;
            const data = await res.json();
            console.log("user name?????", data.unique);
            if (data.unique == "false") {
                setUnique(true);
                return false;
            }
            if (data.unique == "true") {
                return true;
            }
            const res_1 = undefined;
            console.log("success to post"); console.log();
            ;
        } catch (err) {
            console.log(err);
        }
    }

    const createId=()=>{
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    };

    const register=()=>{
        let regex = new RegExp('[a-z0-9]+@+[a-z0-9]+.cuhk.edu.hk');
        console.log("testID",createId());
        console.log(fname);
        let check = true ;
        if(regex.test(email)==false || email==""){
            console.log("email problem");
            check = false;
        }
        if(fname=="" || lname=="" || username=="" ||pw1=="" || pw2=="" || phone==""){
            console.log("something empty");
            check = false;
        }

        if(check==false){
            setMiss(true);
        }

        if(phone > 20000000 ||phone<70000000 || phone>=90000000||phone<99999999){
            check = true;
        }else{
            check = false;
            setNum(true);
        }

        let pwRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z])))(?=.{4,})");
        if(pwRegex.test(pw1)===false || pw1===""){
            check = false;
            console.log("Password Problem");
            setTest(true);
        }
        
        if(pw1!=pw2){
            console.log("different password");
            setDiff(true);
            check = false;
        }

        if(check ==true){
            checkUsename()
            .then(res=>{
                if(res==true){
                    fetch('/dbAccount/createAccount', { //saving to database
                        method: 'POST', 
                        body: new URLSearchParams({
                            "email":email,
                            "password":pw2,
                            "user_name": username,
                            "phone": phone,
                            "first_name":fname,
                            "last_name":lname,
                            "faculty": faculty,
                            "college": college,
                            "gender": gender,
                            "uid": uid,
                        })  
                    })
                    .then(()=> {
                        console.log("registered");
                        ReactDOM.render(<AskForVerification/>,document.getElementById('Component'));
                    })
                    .catch((err)=>{
                        console.log(err);
                    });
                }
            })

         
            return;
        }
        // console.log(false)
    }

    const handleClose=(event, reason)=>{
        if (reason === 'clickaway') {
            return;
          }
        if(miss==true){
            setMiss(false);
        }
        if(test==true){
            setTest(false);
        }
        if(num==true){
            setNum(false);
        }
        if(diff==true){
            setDiff(false);
        }
        if(unique==true){
            setUnique(false);
        }

    }

    return(
        <div id="login-register" className="login-container" >
            <section className="shadow-lg bg-white border border-4 rounded p-2 p-lg-4" style={{borderColor: "#5D4E99 !important"}}> 
                <h2>Let&apos;s get started!</h2>
                <h6 className="text-muted">Create a new account</h6>
                <br/>
                <form className="form-floating text-secondary">
                    <div className="form-floating mb-3">
                        <input className="form-control" id="new-user-email" value={email} onChange={handleChangeEmail} placeholder="email" required></input>
                        <label for="floatingPassword">Email*</label>
                    </div>
                    <div className="input-group">
                        <div className="form-floating mb-3">
                            <input className="form-control" id="user-fn" value={fname} onChange={handleChangeFname} placeholder="firstname" required></input>
                            <label for="floatingPassword">First Name*</label>
                        </div>
                        <div>&ensp;</div>
                        <div className="form-floating mb-3">
                            <input className="form-control" id="user-ln" value={lname} onChange={handleChangeLname} placeholder="lastname" required></input>
                            <label for="floatingPassword">Last Name*</label>
                        </div>
                    </div>
                        <div className="form-floating mb-3">
                            <input className="form-control" id="user-un" value={phone} onChange={handleChangePhone} placeholder="phone" required></input>
                            <label for="floatingPassword">Phone*</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input className="form-control" id="user-un" value={username} onChange={handleChangeUsername} placeholder="username" required></input>
                            <label for="floatingPassword">Username*</label>
                        </div>
                    <div className="input-group mb-3">
                        <div className="form-floating col-11">
                            <input type="password" className="form-control" id="user-pw-1" value={pw1} onChange={handleChangePw1} placeholder="password" required></input>
                            <label for="floatingPassword">Password*</label>
                        </div>
                        <button type="button" onClick={viewPassword1} className="btn col-1">
                            <i id="first-close" className="bi bi-eye-slash-fill icon" style={{display: iconA}}></i>
                            <i id="first-open" className="bi bi-eye-fill icon" style={{display: iconB}}></i>
                        </button>
                    </div>
                    <div className="input-group mb-3">
                        <div className="form-floating col-11">
                            <input type="password" className="form-control" id="user-pw-2" value={pw2} onChange={handleChangePw2} placeholder="re-enter" required></input>
                            <label for="floatingPassword">Re-enter Password*</label>
                        </div>
                        <button type="button" onClick={viewPassword2} className="btn col-1">
                            <i id="second-close" className="bi bi-eye-slash-fill icon" style={{display: iconC}}></i>
                            <i id="second-open" className="bi bi-eye-fill icon" style={{display: iconD}}></i>
                        </button>
                    </div>
                    <Box sx={{margin: 2}}>
                        <FormControl fullWidth>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Gender
                            </InputLabel>
                            <NativeSelect
                            onChange={handleChangeGender}
                            >
                            {genders.map((gen,index)=>(<option key={gen} value={gen}>{gen}</option>))}
                            </NativeSelect>
                        </FormControl>
                        </Box>
                        <Box sx={{margin: 2}}>
                        <FormControl fullWidth>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            College
                            </InputLabel>
                            <NativeSelect
                            onChange={handleChangeCollege}
                            >
                            {colleges.map((col,index)=>(<option key={col}value={col}>{col}</option>))}
                            </NativeSelect>
                        </FormControl>
                        </Box>
                        <Box sx={{margin: 2}}>
                        <FormControl fullWidth>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Faculty
                            </InputLabel>
                            <NativeSelect
                            onChange={handleChangeFaculty}
                            >
                            {faculties.map((fac,index)=>(<option key={fac}value={fac}>{fac}</option>))}
                            </NativeSelect>
                        </FormControl>
                        </Box>

                    <br/>
                    <button type="button" className="btn text-white" style={{backgroundColor: "#5D4E99"}} onClick={register} >Register</button>
                    <br/><br/>
                    <p><a style={{color: "#F4CB86"}} href="contact.html">*: Required field</a></p>
                    <p><a style={{color: "#F4CB86"}} href="contact.html">Join us as a restaurant? Welcome and contact us!</a></p>
                    <Snackbar open={miss} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                            Missing Information, please ensure fill up all required fields
                        </Alert>
                    </Snackbar>
                    <Snackbar open={unique} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                        Username already exists. Please change your username
                        </Alert>
                    </Snackbar>
                    <Snackbar open={num} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                            Incorrect phone number
                        </Alert>
                    </Snackbar>
                    <Snackbar open={diff} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                            Different passwords. Please check again
                        </Alert>
                    </Snackbar>
                    <Snackbar open={test} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                        Invalid Password, Valid Password: Minimum Password Length: 4, At Least 1 Capital Letter, At Least 1 Small Letter
                        </Alert>
                    </Snackbar>
                </form>
            </section>
        </div>
    );
}

// PROGRAM AskForVerification
// CALLING PROCEDURE 
// 1. Login->check email-> login with password (account not verified)
// 2. Login->check email-> register
// Purpose: Remind user to verify the email in order to login and use the system.
// PROGRAMMER: NG Wing Ki Vickie
// VERSION: 12-4-2022
// DATA STRUCTURE
// Variable open - STRING
// Algorithm
// 1.Pop up reminder
function AskForVerification(){
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Email Verification"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please verify your account by clicking the link sent to your email before login :)
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export {LoginPage,ChangePassword,EmailVerification };
