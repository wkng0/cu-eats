

function checkEmail(){
    let regex = new RegExp('[a-z0-9]+@+[a-z0-9]+.cuhk.edu.hk');
    let email = document.getElementById('user-email');
    if(regex.test(email.value)==false || email.value==""){
        console.log("false email!");
    }else{
        // if(True){
            document.getElementById('login-password').style.display = "block";
            document.getElementById('exist-email').innerText = email.value;
        // }else{
        //     document.getElementById('login-register').style.display = "block";
        // }
    }
}

function viewPassword(pw,closed,open){
    let passwordInput = document.getElementById(pw);
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        passwordInput.setAttribute('aria-label',
          'Hide password.');
        document.getElementById(closed).style.display = "none";
        document.getElementById(open).style.display = "block";
      } else {
        passwordInput.type = 'password';
        passwordInput.setAttribute('aria-label',
          'Show password as plain text. ' +
          'Warning: this will display your password on the screen.');
          document.getElementById(closed).style.display = "block";
          document.getElementById(open).style.display = "none";
      }

}

function login(){

}

function register(){
    let regex = new RegExp('[a-z0-9]+@+[a-z0-9]+.cuhk.edu.hk');
    let email = document.getElementById('new-user-email').value;
    let fn = document.getElementById('user-fn').value;
    let ln = document.getElementById('user-ln').value;
    let pwOne = document.getElementById('user-pw-1').value;
    let pwTwo = document.getElementById('user-pw-2').value;
    console.log(email);
    let check = true ;
    if(regex.test(email)==false || email==""){
        console.log("email problem");
        check = false;
    }
    if(fn=="" || ln=="" || pwOne=="" || pwTwo==""){
        console.log("something empty");
        check = false;
    }
    if(pwOne!=pwTwo){
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