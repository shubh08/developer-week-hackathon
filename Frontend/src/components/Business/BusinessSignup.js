import React, {Component} from 'react';
import './community.css'
// import {countryList} from './Countries'
// import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import axios from 'axios'
import {Redirect} from 'react-router';
import NotificationAlert from 'react-notification-alert';
import "react-notification-alert/dist/animate.css";
// import '../navbar'

var options = {};
options = {
    place: 'tc',
    message: (
        <div>
            <div>
            <p align="center">Login to <b>SMART-MOM</b> Failed </p>
            </div>
        </div>
    ),
    type: "danger",
    icon: "now-ui-icons ui-1_bell-53",
    autoDismiss: 3
}

var optionsSignupFailure = {};
optionsSignupFailure={
  place: 'tc',
  message: (
      <div>
          <div>
             <p align="center">Email ID already registered!</p>
          </div>
      </div>
  ),
  type: "danger",
  icon: "now-ui-icons ui-1_bell-53",
  autoDismiss: 3
}

var optionsSignupSuccess = {};
optionsSignupSuccess={
  place: 'tc',
  message: (
      <div>
          <div>
          <p align="center">Sign up Successful!</p>
          </div>
      </div>
  ),
  type: "success",
  icon: "now-ui-icons ui-1_bell-53",
  autoDismiss: 3
}

class BusinessSignup  extends Component{
  constructor (props) {
    super(props);
    this.state={
      name:" ",
      email:" ",
      password:" ",
      country:" ",
      emailsignin:" ",
      passwordsignin:" ",
      country:" ",
      loginStatus:false,
      showMessage:false,
    }

  }
  myFunc(){
    this.refs.notify.notificationAlert(options);
}
  valueChangedHandler = (event) => {
   // console.log('Event target', event.target)
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });

    console.log('State status', this.state)
  }
 
  signin=()=>{
console.log('here in signin');
let data =  {username:this.state.emailsignin,password:this.state.passwordsignin}
 //make a post request with the user data
 axios.post('http://3.17.152.109:3010/login',data)
 .then(response => {
     console.log("Status Code : ",response.data);
     if(response.status === 200){
         console.log('User Login success')
         localStorage.setItem('username', response.data.responseMessage.username);
         localStorage.setItem('name', response.data.responseMessage.name);
         this.setState({
           loginStatus:true
         })
     }
     else{
         
    console.log('User Login Failure!!')
    // this.setState({
    //  showMessage:true
    // })
    this.refs.notify.notificationAlert(options);
     }
 }).catch(error => {
  
    console.log('User Login Failure!!')
    //  this.setState({
    //   showMessage:true
    //  })
    this.refs.notify.notificationAlert(options);
     
 })
  }

  signup=()=>{
console.log('signup')
let data =  {username:this.state.email,email:this.state.email,password:this.state.password,name:this.state.name,country:this.state.country}
 //make a post request with the user data
 axios.post('http://3.17.152.109:3010/signup',data)
 .then(response => {
     console.log("Status Code : ",response.data);
     if(response.status === 200){
         console.log('User Signup success')
         this.refs.notifySignUpSuccess.notificationAlert(optionsSignupSuccess);
     }else{
      this.refs.notifySignUpFailure.notificationAlert(optionsSignupFailure);
     }
 }).catch(error => {
  console.log('User Signup Failure!!')  //notifySignUpSuccess
  this.refs.notifySignUpFailure.notificationAlert(optionsSignupFailure);
 })
  }


  componentDidMount(){
    //    let script = document.createElement("script");

    //     script.src = require('./LoginDynamic');
    //     script.async = true;
    
    //     document.body.appendChild(script);
  }

  changeCountry=()=>{
console.log('Here in the country changeee')
    var x = document.getElementById("country").value;
    console.log('Here in the country changeee',x)
    this.setState({
      country :x
    })
    console.log('State Value',this.state)
  }

//   getCountries = ()=>{
//     let country = countryList.map((count)=>{
//     return <option value={count.code}>{count.name}</option>
//     })
//     //console.log('country list is -------------------->',country);
//     return country;
//   }
    render(){

    //  // const { country, region } = this.state;
    //   let showCountry = this.getCountries()
      let redirectVar = null;
        if(this.state.loginStatus){
            redirectVar = <Redirect to= "/mom/dashboard"/>
        }
        console.log('Redirected',redirectVar); 
        return (
            <div>
              {redirectVar}
              <NotificationAlert ref="notify" />
              <NotificationAlert ref="notifySignUpFailure" />
              <NotificationAlert ref="notifySignUpSuccess" />
              {/* {this.state.showMessage==true?<div>
          <NotificationAlert ref="notify" />
        <button onClick={() => this.myFunc()}>Hey</button>
      </div>:<div></div>} */}
              <div id="id01">
              <form class="modal-content">
              <div class="container">
              <h2>Business SignUp</h2>
      <p>Please fill in this form to create an account.</p>
      <hr/>
      <label for="email"><b>Email</b></label>
      <input type="text" placeholder="Enter Email" name="email" required/>

      <label for="psw"><b>Password</b></label>
      <input type="password" placeholder="Enter Password" name="psw" required/>
      <label for="psw-repeat"><b>Repeat Password</b></label>
      <input type="password" placeholder="Repeat Password" name="psw-repeat" required/>
      
      <label>
        <input type="checkbox" checked="checked" name="remember" style={{ "margin-bottom": '15px' }}/> Remember me
      </label>
      <p>By creating an account you agree to our <a href="#" style={{"color":'dodgerblue'}}>Terms & Privacy</a>.</p>

<div class="clearfix">
  <button type="button" onclick="document.getElementById('id01').style.display='none'" class="cancelbtn">Cancel</button>
  <button type="submit" class="signupbtn">Sign Up</button>
</div>
                  </div>
                  </form>
</div>

            </div>
          );
    }
}

export default BusinessSignup;