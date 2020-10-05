import React,{Component} from "react";
import './Settings Styles.css';
import Button from '@material-ui/core/Button';
import ArrowBackSharpIcon from '@material-ui/icons/ArrowBackSharp';
import ExitToApp from '@material-ui/icons/ExitToApp'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import HelpIcon from '@material-ui/icons/Help';
import AccountBox from '@material-ui/icons/AccountBox';
import BuildIcon from '@material-ui/icons/Build';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AlertDialogSlide(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const click = ()=>{
    props.parentMethod()
    setOpen(false)
  }

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        {props.buttonName}
      </Button>
      
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title"> {props.title} </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {props.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Dismiss
          </Button>
          <Button onClick={click} color="primary">
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

class StudentView extends Component{
  constructor(props){
    super(props);
    this.state = {
      alert: false,
      names: []
    }
    this.displayAlert = this.displayAlert.bind(this)
  }

  click = (props) =>{
    this.props.parentMethod()
  }

  reset(){
    localStorage.setItem('completed',null)
  }

  upgrade(){
    var names = JSON.parse(localStorage.getItem('names'))

    for(var i = 0; i<names.length; i++){

      if(names[i].class[0] === "2"){
        names[i].class = names[i].class.replace("2","3")}

      else if(names[i].class[0] === "1"){
        names[i].class = names[i].class.replace("1","2")}

      else{
        delete names[i] }}  

    var filtered_names = names.filter(i=> i !== null)
    localStorage.setItem('names', JSON.stringify(filtered_names))
    window.location.reload()
  }
 displayAlert(){
   this.setState({
     alert: !this.state.alert
   })
 }
  render(){
    return(
      <div >
      <div className="StudentViewBack">
      <Button variant = "contained" color ="secondary" startIcon = {<ArrowBackSharpIcon/>} 
      onClick = {this.click}> Back </Button>
      </div>
      <div className ="StudentViewBody">
      
        <div className = "ResetCalls">
        <h1> Reset Completed Roll Calls</h1>
        <div className = "StudentBtn">
        <AlertDialogSlide title = "Reset Data" message ="This action is irrevesible as all completed roll calls will be deleted completely." buttonName="Reset" parentMethod={this.reset} />
        </div>
        </div>
        <Divider/>
        <div className = "UpgradeCalls">
          <h1> Upgrade Classes </h1>
          <div className = "StudentBtn">
          <AlertDialogSlide title="Upgrade Students" message="By proceding, all form 3 students will be deleted from the database and students in the previous grades will have their grade level shifted up by one." buttonName="Upgrade" parentMethod={this.upgrade}/> 
          </div>
        </div>
      </div>
      </div>
    )
  }
}

class AccountView extends Component{

  click = (props) =>{
    this.props.parentMethod();
  }

  LogClick = () =>{
    this.props.parentMethod1()
  }

  render(){
    return(
      <div className="Account">
      <div className ="AccountBack">
        <Button variant = "contained" color ="secondary" startIcon = {<ArrowBackSharpIcon/>} 
      onClick = {this.click} > Back </Button>
      </div>
      <div className="LogOutBox">
        <h1 className = "LogOutText"> Logout </h1>
        <div className="ExitBtn">
        <Button variant = "contained" color ="primary"  startIcon = {<ExitToApp/>}onClick = {this.LogClick} > Logout</Button>
        </div>
      </div>
      </div>
    )
  }
}

const FAQ = ()=>{
  return(
    <div>
       <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography >Why is the start roll call button disabled?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
           The button is disabled either when no data has been saved or a blank name or class
           has been saved in edit.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography >How should I input the classes of students in edit?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            The classes of students should be inputted with the grade level 
            first before any other description. 
            The following are valid: 1E, 1D2, 1 Science 4,2B2,3 Arts 2.
            The following are invalid: Form 1, Form 2F, Form3. 
            Always include the grade number first,
            otherwise the students cannot be counted to see the number of students
            in each grade.
          </Typography>
        </AccordionDetails>
        
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography >Why isn't a functionality to change username or password included?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            The roll call app is mainly an offline app which means, no internet connection
            is needed to use it so the app does not collect user data such as
            email address or phone number which can be used to reset the password or username
            incase it is forgotten. So in order to maintan maximum security, the password
            and username should be known only by the club executives who can be trusted to keep
            it safe.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
      <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
        <Typography> Why is there a * by phone number in the edit page?</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          The app does not utilize phone numbers for any purpose. It is an optional
          field to fill in if the club executives feel there will be the need to have 
          the phone numbers of club members.
        </Typography>
      </AccordionDetails>
      </Accordion>   

      <Accordion>
        <AccordionSummary
         expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        > 
        <Typography> What are the terms and conditions of using this app?</Typography> 
       </AccordionSummary>
     <AccordionDetails>
       <Typography>
       
        Copyright (c) 2020 Tariq Sulley

        MIT License

      Copyright (c) 2020 Tariq Sulley

      Permission is hereby granted, free of charge, to any person obtaining a copy
      of this software and associated documentation files (the "Software"), to deal
      in the Software without restriction, including without limitation the rights
      to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
      copies of the Software, and to permit persons to whom the Software is
      furnished to do so, subject to the following conditions:

      The above copyright notice and this permission notice shall be included in all
      copies or substantial portions of the Software.

      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
      FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
      AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
      LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
      OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.    
       </Typography>
     </AccordionDetails>
      </Accordion> 
    
      <Accordion>
        <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        > 
        <Typography> Who created this application and how do I contact him?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            This application was created by Tariq Sulley. You can reach out to him 
            by email at "tariqsulley3c@gmail.com" or on phone at "0271853220".
          </Typography>
        </AccordionDetails>
      </Accordion>
      
    </div>
  )
}

class Help extends Component{

  click = ()=>{
    this.props.parentMethod()
  }

  render(){
    return(
      <div className="HelpBox">

      <div className = "HelpBack">
      <Button variant = "contained" color = "secondary" onClick= {this.click} startIcon={<ArrowBackSharpIcon/>}> 
      Back
      </Button>
      </div>
      <div className = "HelpInfo">
      <FAQ/>
      </div>
      </div>
    )
  }
}

class settings extends Component{
  constructor(props){
    super(props)
    this.state ={
      password: '',
      newpassword:'',
      confirmNew:'',
      studentactionsview: false,
      accountview: false,
      helpview: false
    }
    this.LogOut = this.LogOut.bind(this)
    this.existingPassword = this.existingPassword.bind(this)
    this.studentactions = this.studentactions.bind(this)
    this.accountactions = this.accountactions.bind(this)
    this.helpactions = this.helpactions.bind(this)
}

studentactions(){
  this.setState({
    studentactionsview: !this.state.studentactionsview
  })
}

accountactions(){
  this.setState({
    accountview: !this.state.accountview
  })
}

helpactions(){
  this.setState({
    helpview: !this.state.helpview
  })
}

LogOut(){
  localStorage.setItem('login', true)
  window.location.reload()
}

existingPassword(event){
  this.setState({
    password: event.target.value
  })
}

applychanges(){
}

render(){
  if(!this.state.studentactionsview && !this.state.accountview && !this.state.helpview){
  return(
    <div className ="Background">
    <div className ="SettingsBody">
    
    <div className = "SettingsForm">
    <List component="nav" aria-label="main mailbox folders">
        <Divider/>
        <ListItem button onClick = {this.studentactions}>
          <ListItemIcon>
            <BuildIcon />
          </ListItemIcon>
          <ListItemText primary="Student Actions" secondary = "Reset,upgrade" />
        </ListItem>
        <Divider/>
        <ListItem button onClick = {this.accountactions}>
          <ListItemIcon>
            <AccountBox/>
          </ListItemIcon>
          <ListItemText primary="Account" secondary = "Log out" />
        </ListItem>
        <Divider/>
        <ListItem button onClick = {this.helpactions}>
          <ListItemIcon>
            <HelpIcon/>
          </ListItemIcon>
          <ListItemText primary ="Help" secondary ="FAQ,terms and conditions,contact"/>
        </ListItem>
        <Divider/>
      </List>
   
    </div>
    </div>
    </div>
    )}

    else if (this.state.studentactionsview === true){
      return(
        <StudentView parentMethod ={this.studentactions}/>
      )
    }

    else if(this.state.accountview === true){
      return(
        <AccountView parentMethod = {this.accountactions} parentMethod1= {this.LogOut}/>
      )
    }
    
    else if(this.state.helpview === true){
      return(
        <Help parentMethod = {this.helpactions}/>
      )
    }
  }
}

export default (settings);
