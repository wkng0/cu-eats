import React from 'react'
import './login.css';
import  ReactDOM from 'react-dom';

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

}


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
        if(regex.test(this.state.email)==false || this.state.email==""){
            console.log("false email!");
        }else{
            fetch('http://localhost:7000/dbAccount/exist/'+this.state.email)
            .then((res)=>{
                res.json();
                // console.log(res);
                // if (res==true){
                //     this.setState({pass: true});
                // }else{
                //     this.setState({pass: false});
                // }
            })
            .then(db=>{
                console.log(db);
                let data = [];
                data = db;
                console.log(data);
                if (db==="true"){
                    this.setState({pass: true});
                }else{
                    this.setState({pass: false});
                }
            })
            .catch((err)=>{console.log(err)})

            if(this.state.pass == true){
                ReactDOM.render(<LoginWithPassword email={this.state.email}/>,document.getElementById('Component'));
            }else{
                ReactDOM.render(<Register email={this.state.email}/>)
            }
        
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
}

class LoginWithPassword extends React.Component{
    constructor(props){
        super(props);
        this.state={email: props.email, password:'', iconA:"block", iconB:"none"};
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
              this.setState({iconA:"none",iconB:"block"});
            
          } else {
            passwordInput.type = 'password';
            passwordInput.setAttribute('aria-label',
              'Show password as plain text. ' +
              'Warning: this will display your password on the screen.');
            this.setState({iconA:"block",iconB:"none"});
          }
    
    }
    login(){
        
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

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email: props.email, 
            pw1:'',
            pw2:'', 
            fname:'' ,
            lname:'',
            iconA:"block",
            iconB:"none",
            iconC:"block",
            iconD:"none"
        };
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeFname = this.handleChangeFname.bind(this);
        this.handleChangeLname = this.handleChangeLname.bind(this);
        this.handleChangePw1 = this.handleChangePw1.bind(this);
        this.handleChangePw2 = this.handleChangePw2.bind(this);
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
    handleChangePw1(event){
        this.setState({pw1: event.target.value})
    }
    handleChangePw2(event){
        this.setState({pw2: event.target.value})
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
    register(){
        let regex = new RegExp('[a-z0-9]+@+[a-z0-9]+.cuhk.edu.hk');

        console.log(this.state.fname);
        let check = true ;
        if(regex.test(this.state.email)==false || this.state.email==""){
            console.log("email problem");
            check = false;
        }
        if(this.state.fname=="" || this.state.lname=="" ||this.state.pw1=="" || this.state.pw2==""){
            console.log("something empty");
            check = false;
        }
        if(this.state.pw1!=this.state.pw2){
            console.log("different password");
            check = false;
        }
        if(check ==true){
            //go to next page
            console.log(true)
            return;
        }
        console.log(false)
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
                            <label for="floatingPassword">Email</label>
                        </div>
                        <div className="input-group">
                            <div className="form-floating mb-3">
                                <input className="form-control" id="user-fn" value={this.state.fname} onChange={this.handleChangeFname} placeholder="firstname" required></input>
                                <label for="floatingPassword">First Name</label>
                            </div>
                            <div>&ensp;</div>
                            <div className="form-floating mb-3">
                                <input className="form-control" id="user-ln" value={this.state.lname} onChange={this.handleChangeLname} placeholder="lastname" required></input>
                                <label for="floatingPassword">Last Name</label>
                            </div>
                        </div>
                        <div className="input-group mb-3">
                            <div className="form-floating col-11">
                                <input type="password" className="form-control" id="user-pw-1" value={this.state.pw1} onChange={this.handleChangePw1} placeholder="password" required></input>
                                <label for="floatingPassword">Password</label>
                            </div>
                            <button type="button" onClick={this.viewPassword1} className="btn col-1">
                                <i id="first-close" className="bi bi-eye-slash-fill icon" style={{display: this.state.iconA}}></i>
                                <i id="first-open" className="bi bi-eye-fill icon" style={{display: this.state.iconB}}></i>
                            </button>
                        </div>
                        <div className="input-group mb-3">
                            <div className="form-floating col-11">
                                <input type="password" className="form-control" id="user-pw-2" value={this.state.pw2} onChange={this.handleChangePw2} placeholder="re-enter" required></input>
                                <label for="floatingPassword">Re-enter Password</label>
                            </div>
                            <button type="button" onClick={this.viewPassword2} className="btn col-1">
                                <i id="second-close" className="bi bi-eye-slash-fill icon" style={{display: this.state.iconC}}></i>
                                <i id="second-open" className="bi bi-eye-fill icon" style={{display: this.state.iconD}}></i>
                            </button>
                        </div>
                        <br/>
                        <button type="button" className="btn text-white" style={{backgroundColor: "#5D4E99"}} onClick="{register}" >Register</button>
                        <br/><br/>
                        <p><a style={{color: "#F4CB86"}} href="contact.html">Join us as a restaurant? Welcome and contact us!</a></p>
                    </form>
                </section>
            </div>
        );
    }
}
export {LoginPage};