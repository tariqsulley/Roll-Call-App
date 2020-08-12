import React,{Component} from "react";
import TextField from '@material-ui/core/TextField';
import './Settings Styles.css';

class settings extends Component{
  constructor(props){
    super(props)
    this.state ={
      password: '',
      newpassword:'',
      confirmNew:''
    }
    this.LogOut = this.LogOut.bind(this)
    this.existingPassword = this.existingPassword.bind(this)
}

LogOut(){
  /*const val = localStorage.getItem('login')*/
  localStorage.setItem('login', true)
  window.location.reload()
}

passwordChange(){
  /*const password = localStorage.getItem('password')*/
}

existingPassword(event){
  this.setState({
    password: event.target.value
  })
}

applychanges(){
}

render(){
  return(
    <div className ="Background">
    <div className ="SettingsBody">
    
    <div className = "SettingsForm">
    {/* 
    <div className="FormInput">
    <h2 iD="Header">Change Username  </h2>
    <TextField iD = "TF1" variant ="outlined" label ="Existing Username"/>
    <TextField iD ="TF1" variant ="outlined" label ="New UserName"/>
    <TextField iD = "TF1" variant ="outlined" label = "Confirm New Username"/>
    </div>

    <div className="FormInput">
    <h2 iD="Header"> Change Password </h2>
    <TextField iD = "TF1" variant ="outlined" label ="Existing passsword"  value={this.state.password} onChange={this.existingPassword} type="password"/>
    <TextField iD = "TF1" variant ="outlined" label ="New Password" type ="password"/>
    <TextField iD = "TF1" variant ="outlined" label ="Confirm New Password" type="password"/>
    </div>  

    <div className ="Control_btns">
    <button  className="Apply_btn"> Apply Changes </button>
    <button className="LogOut_btn" onClick={this.LogOut}> Log Out </button>
    </div>
    */}
    <div className = "Actions">
      <h1 iD="type"> Students Upgrade</h1>
      <h1 iD = "Acc"> Account</h1>
      <p> Please do not click this button unless the form 3's have completed</p>
      <button> Move Students</button>
    </div>

    </div>
    </div>
    </div>
    )
  }
}

export default (settings);
