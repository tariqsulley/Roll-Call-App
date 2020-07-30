import React,{Component} from 'react';
import Appbar from './components/Appbar.jsx';
import './LoginStyles.css';
import Image from './images/Presec.png';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            login: false,
            username:'',
            password:'',
            ChangePassword: 'Presec'
        }
        this.toggleLogin = this.toggleLogin.bind(this);
        this.validate_username = this.validate_username.bind(this)
        this.validate_password = this.validate_password.bind(this)
    }


    componentDidMount(){
        const log_state = localStorage.getItem('login')
        this.setState({
            login: JSON.parse(log_state)
        })
    }

    componentDidUpdate(){
        localStorage.setItem('login',JSON.stringify(this.state.login))
        localStorage.setItem('password',JSON.stringify(this.state.ChangePassword))
    }

    validate_username(event){
        this.setState({
            username: event.target.value
        })
    }

    validate_password(event){
        this.setState({
            password: event.target.value
        })
    }

    toggleLogin(){
        if(this.state.username === "Sulley" && this.state.password === "Presec" ){
            this.setState({
                login: false
            })
        }
        else if(this.state.username === '' || this.state.password === ''){
            alert("Fill in the username and password")
        }
        else{
            alert("Incorrect Details")

        }
    }
    
    render(){
        if(this.state.login){
        return(
	<div class="LoginBody">
    <div class="LoginBackground">
        <div class="LoginWrap">
            <div class="LoginImg">
                <img src={Image} alt="IMG" className="Presec_Logo"></img>
            </div>

            <form class="LoginForm">
                <span class="AppTitle">
                Roll Call App
                </span>

                <div class="LoginInput">
                    <input class="Input" type="text" name="name" placeholder="Username" value = {this.state.username} onChange={this.validate_username}/>
                    <span class="InputFocus"></span>
                    <span class="symbol-input100">
                        <i class="fa fa-envelope" aria-hidden="true"></i>
                    </span>
                </div>

                <div class="LoginInput" data-validate = "Password is required">
                    <input class="Input" type="password" name="pass" placeholder="Password" value={this.state.password} onChange={this.validate_password}/>
                    <span class="InputFocus"></span>
                    <span class="symbol-input100">
                        <i class="fa fa-lock" aria-hidden="true"></i>
                    </span>
                </div>
                
                <div class="LoginBtnContainer">
                    <button onClick={this.toggleLogin} class="LoginBtn" >
                        Log In
                    </button>
                </div>

            </form>
        </div>
    </div>
</div>
        )
    }
    else{
        return(
            <Appbar/>
        )
    }
    }
}
export default Login;
