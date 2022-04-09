import React, {useContext} from 'react';
import { UserContext } from "./UserContext";
import './login.css';
import  ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Profile, Account, Address, AdminUser, ManagePw, DeleteAcc} from './profile';
import{
    Link,
    Box,
    Button,
    Container,
    TextField,
    InputLabel,
    FormControl,
    Select,
    Typography,
    FormHelperText,
    NativeSelect,
    MenuItem,
    IconButton
  } from '@mui/material';


function LoginPage(){
    return( 
        <div className="body">
            
            <div id="Component">
                <CheckEmail />   
            </div>            
        </div>
    );
}
/*
class LoginPage extends React.Component{  
    render(){
        return(
   
            <div className="body">
                
                <div id="Component">
                    <CheckEmail />   
                </div>            
                
            </div>
    
        );
    }

}*/

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
            fetch('http://localhost:7000/dbAccount/exist/'+email)
            .then((res)=>
                res.json()
                // console.log(res);
                // if (res==true){
                //     this.setState({pass: true});
                // }else{
                //     this.setState({pass: false});
                // }
            )
            .then(db=>{
                console.log(db);
                console.log(typeof(db.email));
                if (db.email=="true"){
                    //this.setState({pass: true});
                    // renderComponent = <LoginWithPassword email={this.state.email}/>;
                    withpw = true;
                    console.log(withpw);
                    // ReactDOM.render(<LoginWithPassword email={this.state.email}/>,document.getElementById('Component'))
                    // return ReactDOM.render(<LoginWithPassword email={this.state.email}/>),document.getElementById('Component');
                    }
                else{
                    //this.setState({pass: false});
                    // renderComponent = <Register email={this.state.email}/>;
                    register = true;
                    console.log(register);
                    // return ReactDOM.render(<Register email={this.state.email}/>),document.getElementById('Component');
                    // return <Register email={this.state.email}/>;
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
/*
class CheckEmail extends React.Component{
    constructor(){
        super();
        this.state={email:'',pass:false};
        this.handleChange = this.handleChange.bind(this);
        this.checkEmail = this.checkEmail.bind(this);
    }
    handleChange(event){
        this.setState({email: event.target.value})
    }
    checkEmail(event){
        let regex = new RegExp('[a-z0-9]+@+[a-z0-9]+.cuhk.edu.hk');
        let register = false;
        let withpw = false;
        if(regex.test(this.state.email)==false || this.state.email==""){
            console.log("false email!");
        }else{
            fetch('http://localhost:7000/dbAccount/exist/'+this.state.email)
            .then((res)=>
                res.json()
                // console.log(res);
                // if (res==true){
                //     this.setState({pass: true});
                // }else{
                //     this.setState({pass: false});
                // }
            )
            .then(db=>{
                console.log(db);
                console.log(typeof(db.email));
                if (db.email=="true"){
                    //this.setState({pass: true});
                    // renderComponent = <LoginWithPassword email={this.state.email}/>;
                    withpw = true;
                    console.log(withpw);
                    // ReactDOM.render(<LoginWithPassword email={this.state.email}/>,document.getElementById('Component'))
                    // return ReactDOM.render(<LoginWithPassword email={this.state.email}/>),document.getElementById('Component');
                    }
                else{
                    //this.setState({pass: false});
                    // renderComponent = <Register email={this.state.email}/>;
                    register = true;
                    console.log(register);
                    // return ReactDOM.render(<Register email={this.state.email}/>),document.getElementById('Component');
                    // return <Register email={this.state.email}/>;
                }
            })
            .then(()=> ReactDOM.render(<div>
                {register && <Register email={this.state.email}/>}
                {withpw && <LoginWithPassword email={this.state.email}/>}
            </div>,document.getElementById('Component')))
            .catch((err)=>{console.log(err)});
            
        }
    }
    
    render(){

        return(
            <>
          
                <div id="login-email" className="login-container">
                    <section className="shadow-lg bg-white border border-4 rounded p-2 p-lg-4" style={{borderColor: '#5D4E99 !important'}}> 
                        <h2>Enter you email</h2>
                        <h6 className="text-muted">We&apos;ll check whether your account already exists :)</h6>
                        <br/>
                        <form className="text-secondary">
                            <div className="mb-3">
                                <input type="email" className="form-control" value={this.state.email} onChange={this.handleChange} id="user-email" placeholder="e.g. name@example.com" required></input>
                            </div>
                            <br/>
                            <button type="button" id="email-continue" className="btn  text-white" style={{backgroundColor: '#5D4E99'}} onClick={this.checkEmail}>Continue</button>
                        </form>
                    </section>
                </div>
    
            </>
            
        );
    }
}*/

function LoginWithPassword(props){
    const [email, setEmail]=React.useState(props.email);
    const [password, setPassword]=React.useState("");
    const [iconA, setIconA]=React.useState("none");
    const [iconB, setIconB]=React.useState("block");
    // const {user, setUser} = useContext(UserContext);
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
        fetch('http://localhost:7000/dbAccount/get/'+email)
        .then(res=>res.json())
        .then(data=>{
            console.log(data[0].password);
            if(data[0].password == password){
                console.log("password is true");
                // console.log(user);
                if(data[0].type == "user"){
                    console.log("Checked user!!!!!!!!!!!!!!!");
                    console.log("UID: ",data[0].uid);
                    localStorage.setItem('user',data[0].uid);
                    localStorage.setItem('type',data[0].type);                 
                }
                window.location.assign("/");
            }
        })
        .catch(err=>console.log(err))
    }
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
                                <i className="bi bi-eye-slash-fill icon" style={{display: iconA }}></i>
                                <i className="bi bi-eye-fill icon" style={{display: iconB }}></i>
                            </button>
                        </div>
                    </div>
                    <br/>
                
                    <button type="button" className="btn text-white" style={{backgroundColor: "#5D4E99"}} onClick={login} >Log in</button>
                    <small className="float-end"><a style={{color: "#F4CB86"}} href="reset.html">Forgot your password?</a></small>
            
                </form>
            </section>
        </div>

        </>
    );
}
/*
class LoginWithPassword extends React.Component{
    constructor(props){
        super(props);
        this.state={email: props.email, password:'', iconA:"none", iconB:"block"};
        this.handleChange = this.handleChange.bind(this);
        this.viewPassword=this.viewPassword.bind(this);
        this.login=this.login.bind(this);
    }
    handleChange(event){
        this.setState({password: event.target.value})
    }
    viewPassword(){
        let passwordInput = document.getElementById('user-pw');
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            passwordInput.setAttribute('aria-label',
              'Hide password.');
              console.log("hi");
              this.setState({iconA:"block",iconB:"none"});
            
          } else {
            passwordInput.type = 'password';
            passwordInput.setAttribute('aria-label',
              'Show password as plain text. ' +
              'Warning: this will display your password on the screen.');
            this.setState({iconA:"none",iconB:"block"});
          }
    
    }
    login(){
        fetch('http://localhost:7000/dbAccount/get/'+this.props.email)
        .then(res=>res.json())
        .then(data=>{
            console.log(data[0].password);
            if(data[0].password == this.state.password){
                console.log("password is true");
                // this.props.history.push("/");
                window.location.assign("/");
                // navigate("/",{state:{login: true}});
            }
        })
        .catch(err=>console.log(err))
    }
    render(){
        return(
            <div id="login-password" className="login-container" >
                <section className="shadow-lg bg-white border border-4 rounded p-2 p-lg-4" style={{borderColor: "#5D4E99 !important"}}> 
                    <h2>Great to see you again!</h2>
                    <h5 id="exist-email">{this.props.email}</h5>
                    <br/>
                    <form className="text-secondary">
                        <div className="mb-3">
                            <label for="new-comment" className="form-label">Enter you password to log in</label>
                            <div className="input-group">
                                <input type="password" className="form-control" value={this.state.password} onChange={this.handleChange} id="user-pw" placeholder="password" required></input>
                                <button type="button" className="btn btn-secondary" onClick={this.viewPassword}>
                                    <i className="bi bi-eye-slash-fill icon" style={{display: this.state.iconA }}></i>
                                    <i className="bi bi-eye-fill icon" style={{display: this.state.iconB }}></i>
                                </button>
                            </div>
                        </div>
                        <br/>
                    
                        <button type="button" className="btn text-white" style={{backgroundColor: "#5D4E99"}} onClick={this.login} >Log in</button>
                        <small className="float-end"><a style={{color: "#F4CB86"}} href="reset.html">Forgot your password?</a></small>
                
                    </form>
                </section>
            </div>
        );
    }
}
*/
// function LoginWithPassword(props){
//     // constructor(props){
//     //     super(props);
//     //     this.state={email: props.email, password:'', iconA:"block", iconB:"none"};
//     //     this.handleChange = this.handleChange.bind(this);
//     //     this.viewPassword=this.viewPassword.bind(this);
//     //     this.login=this.login.bind(this);
//     // }
//     const email = React.useState(props.email);
//     const [password, setPassword] = React.useState('');
//     const [iconA, setIconA] = React.useState("block");
//     const [iconB, setIconB] = React.useState("none");
//     // let navigate = useNavigate();
//     // const navigate = useNavigate();
    
//     const handleChange=(event)=>{
//         setPassword(event.target.value);
//         // setState({password: event.target.value})
//     }
//      const viewPassword=()=>{
//         let passwordInput = document.getElementById('user-pw');
//         if (passwordInput.type === 'password') {
//             passwordInput.type = 'text';
//             passwordInput.setAttribute('aria-label',
//               'Hide password.');
//               console.log("hi");
//             //   this.setState({iconA:"none",iconB:"block"});
//               setIconA("none");
//               setIconB("block");
            
//           } else {
//             passwordInput.type = 'password';
//             passwordInput.setAttribute('aria-label',
//               'Show password as plain text. ' +
//               'Warning: this will display your password on the screen.');
//             // setState({iconA:"block",iconB:"none"});
//             setIconA("block");
//             setIconB("none");
//           }
    
//     }
//      const login=()=>{
//         fetch('http://localhost:7000/dbAccount/get/'+this.props.email)
//         .then(res=>res.json())
//         .then(data=>{
//             console.log(data[0].password);
//             if(data[0].password == password){
//                 console.log("password is true");
//                 window.location.assign("/");
//                 // history.push("/");
//                 // navigate("/",{state:{login: true}});
//             }
//         })
//         .catch(err=>console.log(err))
        
//     }
//         return(
//             <div id="login-password" className="login-container" >
//                 <section className="shadow-lg bg-white border border-4 rounded p-2 p-lg-4" style={{borderColor: "#5D4E99 !important"}}> 
//                     <h2>Great to see you again!</h2>
//                     <h5 id="exist-email">{email}</h5>
//                     <br/>
//                     <form className="text-secondary">
//                         <div className="mb-3">
//                             <label for="new-comment" className="form-label">Enter you password to log in</label>
//                             <div className="input-group">
//                                 <input type="password" className="form-control" value={password} onChange={handleChange} id="user-pw" placeholder="password" required></input>
//                                 <button type="button" className="btn btn-secondary" onClick={viewPassword}>
//                                     <i className="bi bi-eye-slash-fill icon" style={{display: iconA }}></i>
//                                     <i className="bi bi-eye-fill icon" style={{display: iconB }}></i>
//                                 </button>
//                             </div>
//                         </div>
//                         <br/>
                    
//                         <button type="button" className="btn text-white" style={{backgroundColor: "#5D4E99"}} onClick={login} >Log in</button>
//                         <small className="float-end"><a style={{color: "#F4CB86"}} href="reset.html">Forgot your password?</a></small>
                
//                     </form>
//                 </section>
//             </div>
//         );
// }

const colleges =["None","CC","CW","MS","NA","SH","SHAW","UC","WS","WYS","Others"];
const faculties = ["None","Arts","Business Administration","Education","Engineering","Law","Medicine","Science","Social Science","Others"];
const genders = ["None","Male","Female","Others"];


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

    const checkUsename=()=>{
        return fetch('http://localhost:7000/dbAccount/userName/'+username) //check if the username unique
        .then(res=>res.json())
        .then(data=>{
            console.log("user name?????",data.unique);
            if(data.unique=="false"){
                setUnique(false);
                // error = true;
                window.alert("Username already exists. Please change your username");
            }
            if(data.unique=="true"){
                setUnique(true);
            }})
            .then(res=>{
                console.log("success to post");
                // window.location.assign("/");
            })
            .then(()=> {console.log();
            window.location.assign("/");})
            .catch((err)=>{
                console.log(err);
                // error = true;
            });
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
        if(fname=="" || lname=="" || username=="" ||pw1=="" || pw2==""){
            console.log("something empty");
            check = false;
        }
        if(pw1!=pw2){
            console.log("different password");
            window.alert("Different passwords. Please check again");
            check = false;
        }

        if(check ==true){

            // let error = true;
            
            checkUsename()
            .then(()=>{
                console.log("after checking ge unique",unique);
                if(unique== true){
                    fetch('http://localhost:7000/dbAccount/createAccount', { //saving to database
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
                        console.log();
                        window.location.assign("/");
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
                </form>
            </section>
        </div>
    );
}


/*
class Register extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email: props.email, 
            pw1:'',
            pw2:'', 
            fname:'' ,
            lname:'',
            username:'',
            unique: false,
            phone: '',
            gender:'',
            faculty:'',
            college:'',
            uid:'',
            iconA:"block",
            iconB:"none",
            iconC:"block",
            iconD:"none"
        };
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeFname = this.handleChangeFname.bind(this);
        this.handleChangeLname = this.handleChangeLname.bind(this);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePw1 = this.handleChangePw1.bind(this);
        this.handleChangePw2 = this.handleChangePw2.bind(this);
        this.handleChangePhone = this.handleChangePhone.bind(this);
        this.handleChangeGender = this.handleChangeGender.bind(this);
        this.handleChangeFaculty = this.handleChangeFaculty.bind(this);
        this.handleChangeCollege = this.handleChangeCollege.bind(this);
        this.viewPassword1=this.viewPassword1.bind(this);
        this.viewPassword2=this.viewPassword2.bind(this);
        this.register=this.register.bind(this);
    }
    handleChangeEmail(event){
        this.setState({email: event.target.value})
    }
    handleChangeFname(event){
        this.setState({fname: event.target.value})
    }
    handleChangeLname(event){
        this.setState({lname: event.target.value})
    }
    handleChangeUsername(event){
        this.setState({username: event.target.value});
        this.setState({uid: this.createId()});
    }
    handleChangePw1(event){
        this.setState({pw1: event.target.value})
    }
    handleChangePw2(event){
        this.setState({pw2: event.target.value})
    }
    handleChangePhone(event){
        this.setState({phone: event.target.value})
    }
    handleChangeGender(event){
        this.setState({gender: event.target.value})
    }
    handleChangeFaculty(event){
        this.setState({faculty: event.target.value})
    }
    handleChangeCollege(event){
        this.setState({college: event.target.value})
    }
    viewPassword1(){
        let passwordInput = document.getElementById('user-pw-1');
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            passwordInput.setAttribute('aria-label',
              'Hide password.');
              console.log("hi");
              this.setState({iconA:"none",iconB:"block"});
            
          } else {
            passwordInput.type = 'password';
            passwordInput.setAttribute('aria-label',
              'Show password as plain text. ' +
              'Warning: this will display your password on the screen.');
            this.setState({iconA:"block",iconB:"none"});
          }

      
    }
    
    viewPassword2(){
        let passwordInput = document.getElementById('user-pw-2');
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            passwordInput.setAttribute('aria-label',
              'Hide password.');
              console.log("hi");
              this.setState({iconC:"none",iconD:"block"});
            
          } else {
            passwordInput.type = 'password';
            passwordInput.setAttribute('aria-label',
              'Show password as plain text. ' +
              'Warning: this will display your password on the screen.');
            this.setState({iconC:"block",iconD:"none"});
          }
    
    }

    async checkUsename(){
        return fetch('http://localhost:7000/dbAccount/userName/'+this.state.username) //check if the username unique
        .then(res=>res.json())
        .then(data=>{
            console.log("user name?????",data.unique);
            if(data.unique=="false"){
                this.setState({unique: false});
                // error = true;
                window.alert("Username already exists. Please change your username");
            }
            if(data.unique=="true"){
                this.setState({unique: true});
            }})
            .then(res=>{
                console.log("success to post");
                // window.location.assign("/");
            })
            .then(()=> {console.log();
            window.location.assign("/");})
            .catch((err)=>{
                console.log(err);
                // error = true;
            });
    }

    createId(){
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    };

    register(){
        let regex = new RegExp('[a-z0-9]+@+[a-z0-9]+.cuhk.edu.hk');
        console.log("testID",this.createId());
        console.log(this.state.fname);
        let check = true ;
        if(regex.test(this.state.email)==false || this.state.email==""){
            console.log("email problem");
            check = false;
        }
        if(this.state.fname=="" || this.state.lname=="" || this.state.username=="" ||this.state.pw1=="" || this.state.pw2==""){
            console.log("something empty");
            check = false;
        }
        if(this.state.pw1!=this.state.pw2){
            console.log("different password");
            window.alert("Different passwords. Please check again");
            check = false;
        }

        if(check ==true){

            // let error = true;
            
            this.checkUsename()
            .then(()=>{
                console.log("after checking ge unique",this.state.unique);
                if(this.state.unique== true){
                    fetch('http://localhost:7000/dbAccount/createAccount', { //saving to database
                        method: 'POST', 
                        body: new URLSearchParams({
                            "email":this.state.email,
                            "password":this.state.pw2,
                            "user_name": this.state.username,
                            "phone": this.state.phone,
                            "first_name":this.state.fname,
                            "last_name":this.state.lname,
                            "faculty": this.state.faculty,
                            "college": this.state.college,
                            "gender": this.state.gender,
                            "uid": this.state.uid,
                        })  
                    })
                    
                    .then(()=> {
                        console.log();
                        window.location.assign("/");
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

    render(){
        return(
            <div id="login-register" className="login-container" >
                <section className="shadow-lg bg-white border border-4 rounded p-2 p-lg-4" style={{borderColor: "#5D4E99 !important"}}> 
                    <h2>Let&apos;s get started!</h2>
                    <h6 className="text-muted">Create a new account</h6>
                    <br/>
                    <form className="form-floating text-secondary">
                        <div className="form-floating mb-3">
                            <input className="form-control" id="new-user-email" value={this.state.email} onChange={this.handleChangeEmail} placeholder="email" required></input>
                            <label for="floatingPassword">Email*</label>
                        </div>
                        <div className="input-group">
                            <div className="form-floating mb-3">
                                <input className="form-control" id="user-fn" value={this.state.fname} onChange={this.handleChangeFname} placeholder="firstname" required></input>
                                <label for="floatingPassword">First Name*</label>
                            </div>
                            <div>&ensp;</div>
                            <div className="form-floating mb-3">
                                <input className="form-control" id="user-ln" value={this.state.lname} onChange={this.handleChangeLname} placeholder="lastname" required></input>
                                <label for="floatingPassword">Last Name*</label>
                            </div>
                        </div>
                            <div className="form-floating mb-3">
                                <input className="form-control" id="user-un" value={this.state.phone} onChange={this.handleChangePhone} placeholder="phone" required></input>
                                <label for="floatingPassword">Phone*</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input className="form-control" id="user-un" value={this.state.username} onChange={this.handleChangeUsername} placeholder="username" required></input>
                                <label for="floatingPassword">Username*</label>
                            </div>
                        <div className="input-group mb-3">
                            <div className="form-floating col-11">
                                <input type="password" className="form-control" id="user-pw-1" value={this.state.pw1} onChange={this.handleChangePw1} placeholder="password" required></input>
                                <label for="floatingPassword">Password*</label>
                            </div>
                            <button type="button" onClick={this.viewPassword1} className="btn col-1">
                                <i id="first-close" className="bi bi-eye-slash-fill icon" style={{display: this.state.iconA}}></i>
                                <i id="first-open" className="bi bi-eye-fill icon" style={{display: this.state.iconB}}></i>
                            </button>
                        </div>
                        <div className="input-group mb-3">
                            <div className="form-floating col-11">
                                <input type="password" className="form-control" id="user-pw-2" value={this.state.pw2} onChange={this.handleChangePw2} placeholder="re-enter" required></input>
                                <label for="floatingPassword">Re-enter Password*</label>
                            </div>
                            <button type="button" onClick={this.viewPassword2} className="btn col-1">
                                <i id="second-close" className="bi bi-eye-slash-fill icon" style={{display: this.state.iconC}}></i>
                                <i id="second-open" className="bi bi-eye-fill icon" style={{display: this.state.iconD}}></i>
                            </button>
                        </div>
                        <Box sx={{margin: 2}}>
                            <FormControl fullWidth>
                                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                Gender
                                </InputLabel>
                                <NativeSelect
                                onChange={this.handleChangeGender}
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
                                onChange={this.handleChangeCollege}
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
                                onChange={this.handleChangeFaculty}
                                >
                                {faculties.map((fac,index)=>(<option key={fac}value={fac}>{fac}</option>))}
                                </NativeSelect>
                            </FormControl>
                            </Box>

                        <br/>
                        <button type="button" className="btn text-white" style={{backgroundColor: "#5D4E99"}} onClick={this.register} >Register</button>
                        <br/><br/>
                        <p><a style={{color: "#F4CB86"}} href="contact.html">*: Required field</a></p>
                        <p><a style={{color: "#F4CB86"}} href="contact.html">Join us as a restaurant? Welcome and contact us!</a></p>
                    </form>
                </section>
            </div>
        );
    }
}*/
export {LoginPage };