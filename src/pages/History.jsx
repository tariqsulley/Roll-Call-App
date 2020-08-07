import React, {Component} from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import './HistoryStyles.css';
import HistoryCard from './HistoryCard.jsx';
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

  render() {
    if(Completed_Calls !== null){
    return ( 
      <div className ="HistoryBody">   
        {Completed_Calls.map((item) =>{
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
                <p onClick ={this.view}>Present: {stud.length}</p>
                {/*<button onClick={()=>alert(stud.map(name => name.name))} > View </button>*/}
                  </div>
                 )})}
                 
              </div>
                 )})}
            </div> 

          )})}
      </div>
    )} 
    
    else{
      return(
        <div>
          <h1> No RollCall's Conducted Yet </h1>
        </div>
      )
    } 
  } 
}
    
export default withStyles(styles)(HistoryPage);
