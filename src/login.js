import React from 'react'
import logo_yellow from './image/logo_yellow.png'
import './login.css';





class Login extends React.Component{
    
    render(){
        return(
            <article>
                <header className="navbar navbar-expand-sm nav-bg navbar-dark shadow ps-2 pe-2 sticky-top">
                    <a className="navbar-brand" href="index.html">
                        <img src={logo_yellow} width="auto" height="30" alt=""></img><strong className="brand"> CU EATS</strong>
                    </a>
                    <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span> Menu
                    </button>
                    <div className="collapse navbar-collapse" style={{textAlign: 'right'}} id="navbarCollapse">
                        <ul className="navbar-nav ms-auto" style={{textAlign: 'center'}}>
                            <li className="nav-item"><a className="nav-link" href="about.html">About Us</a></li>
                            <li className="nav-item"><a className="nav-link" href="menu.html">Menu</a></li>
                            <button className="btn btn-outline-warning my-2 my-sm-0" type="submit">
                                <i className="bi bi-basket-fill icon"></i>
                                <b className="collapse" id="navbarCollapse">&ensp;Shopping Cart</b>
                            </button>
                        </ul>
                    </div>
                </header>
                <div id="login-email" className="login-container">
                    <section className="shadow-lg bg-white border border-4 rounded p-2 p-lg-4" style={{borderColor: '#5D4E99 !important'}}> 
                        <h2>Enter you email</h2>
                        <h6 className="text-muted">We&apos;l check whether your account already exists :)</h6>
                        <br/>
                        <form className="text-secondary">
                            <div className="mb-3">
                                <input type="email" className="form-control" id="user-email" placeholder="e.g. name@example.com" required></input>
                            </div>
                            <br/>
                            <button type="button" id="email-continue" className="btn  text-white" style={{backgroundColor: '#5D4E99'}} onClick="{checkEmail()}">Continue</button>
                        </form>
                    </section>
                </div>

                <div id="login-password" className="login-container" style={{display: "none"}}>
                    <section className="shadow-lg bg-white border border-4 rounded p-2 p-lg-4" style={{borderColor: "#5D4E99 !important"}}> 
                        <h2>Great to see you again!</h2>
                        <h5 id="exist-email">name@example.com</h5>
                        <br/>
                        <form className="text-secondary">
                            <div className="mb-3">
                                <label for="new-comment" className="form-label">Enter you password to log in</label>
                                <div className="input-group">
                                    <input type="password" className="form-control" id="user-pw" placeholder="password" required></input>
                                    <button type="button" className="btn btn-secondary" onClick="{viewPassword}">
                                        <i className="bi bi-eye-slash-fill icon"></i>
                                        <i className="bi bi-eye-fill icon" style={{display: "none"}}></i>
                                    </button>
                                </div>
                            </div>
                            <br/>
                            <button type="button" className="btn text-white" style={{backgroundColor: "#5D4E99"}} onClick="{login}" disabled>Log in</button>
                            <small className="float-end"><a style={{color: "#F4CB86"}} href="reset.html">Forgot your password?</a></small>
                        </form>
                    </section>
                </div>

                <div id="login-register" className="login-container" style={{display: "none"}}>
                    <section className="shadow-lg bg-white border border-4 rounded p-2 p-lg-4" style={{borderColor: "#5D4E99 !important"}}> 
                        <h2>Let&aposs get started!</h2>
                        <h6 className="text-muted">Create a new account</h6>
                        <br/>
                        <form className="form-floating text-secondary">
                            <div className="form-floating mb-3">
                                <input className="form-control" id="new-user-email" placeholder="email" required></input>
                                <label for="floatingPassword">Email</label>
                            </div>
                            <div className="input-group">
                                <div className="form-floating mb-3">
                                    <input className="form-control" id="user-fn" placeholder="firstname" required></input>
                                    <label for="floatingPassword">First Name</label>
                                </div>
                                <div>&ensp;</div>
                                <div className="form-floating mb-3">
                                    <input className="form-control" id="user-ln" placeholder="lastname" required></input>
                                    <label for="floatingPassword">Last Name</label>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <div className="form-floating col-11">
                                    <input type="password" className="form-control" id="user-pw-1" placeholder="password" required></input>
                                    <label for="floatingPassword">Password</label>
                                </div>
                                <button type="button" onClick="{viewPassword('user-pw-1','first-close','first-open')}" className="btn col-1">
                                    <i id="first-close" className="bi bi-eye-slash-fill icon" style={{display: "block"}}></i>
                                    <i id="first-open" className="bi bi-eye-fill icon" style={{display: "none"}}></i>
                                </button>
                            </div>
                            <div className="input-group mb-3">
                                <div className="form-floating col-11">
                                    <input type="password" className="form-control" id="user-pw-2" placeholder="re-enter" required></input>
                                    <label for="floatingPassword">Re-enter Password</label>
                                </div>
                                <button type="button" onClick="{viewPassword('user-pw-2','second-close','second-open')}" className="btn col-1">
                                    <i id="second-close" className="bi bi-eye-slash-fill icon" style={{display: "block"}}></i>
                                    <i id="second-open" className="bi bi-eye-fill icon" style={{display: "none"}}></i>
                                </button>
                            </div>
                            <br/>
                            <button type="button" className="btn text-white" style={{backgroundColor: "#5D4E99"}} onClick="{register}" >Register</button>
                            <br/><br/>
                            <p><a style={{color: "#F4CB86"}} href="contact.html">Join us as a restaurant? Welcome and contact us!</a></p>
                        </form>
                    </section>
                </div>

                <footer className="text-md-center text-light bg-secondary p-2 mt-sm-3 fixed-bottom" style={{fontSize:"10px"}}>
                    © 2022 CSCI 3100 Group D2
                </footer>
            </article>
        );
    }

}




export {Login};