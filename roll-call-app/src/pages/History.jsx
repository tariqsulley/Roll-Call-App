import React, {Component} from "react";
import { withStyles } from "@material-ui/core/styles";
import './HistoryStyles.css';
import HistoryCard from './HistoryCard.jsx';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
const styles = theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
});
 

const Completed_Calls = JSON.parse(localStorage.getItem('completed'))

class HistoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      current: []
      }
      this.view = this.view.bind(this)
      this.deleteItem = this.deleteItem.bind(this)
  }
  
  componentDidMount(){
      this.setState({
        history: Completed_Calls
      })
      console.log(this.state.history)
    }

  view(stud){
   alert('Hi' + stud.name)
  }

  deleteItem = indexToDelete => {
    this.setState(({ history }) => ({
      history: Completed_Calls.filter((index) => index !== indexToDelete)
    }));
  };

  render() {
    if(Completed_Calls !== null){
    return ( 
      <div className ="HistoryBody">   
        {this.state.history.map((item) =>{
          return(
            <div className="MainArray">
             {item.map((obj) => {
            return(
              <div className = "Completed_RollCall">
                {obj.map((stud) => {
                return(
                  <div className ="Absent_Present" >

                    {stud.map((fin) =>
                      <div className="Names"> 
                      <h1> {fin.Date}</h1> 
                  
                      <HistoryCard name={fin.name} Class = {fin.class}/> 
                      </div> 
                    )}
                {/* Cannot read
                property name of undefined when no student is present*/}
                <p> 
                {stud.filter( name => 
                Completed_Calls.map(arr => arr[0][0][0]).some(i => name.name === i.name )) 
                ? "Present":"Absent"}: {stud.length}</p>
                <button onClick={()=>alert(stud.map(name => name.name))} > View </button>
                  </div>
                 )})}
                 <Button variant="contained" color = "primary" onClick={this.deleteItem} startIcon={<DeleteIcon/>}> Delete </Button>
              </div>
                 )})}
            </div> 

          )})}
      </div>
    )} 
    
    else{
      return(
        <div className="NoCalls">
          <h1> No Roll Calls Conducted Yet </h1>
        </div>
      )
    } 
  } 
}
    
export default withStyles(styles)(HistoryPage);
