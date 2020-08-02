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
/* 
[[[[{"name":"Prince Asiedu","house":"9","class":"1D2","tableData":{"id":2}}],[{"name":"Kalikrates","house":"9","class":"1H","tableData":{"id":5}}]]],[[[{"name":"Prince Asiedu","house":"9","class":"1D2","tableData":{"id":2}}],[{"name":"Kalikrates","house":"9","class":"1H","tableData":{"id":5}}]]],[[[{"name":"Jeslord Thompson","house":"9","class":"2G","tableData":{"id":0}},{"name":"Michael Norman","house":"9","class":"3B2","tableData":{"id":1}},{"name":"Prince Asiedu","house":"9","class":"1D2","tableData":{"id":2}},{"name":"Ronald Eyeson","house":"9","class":"3D3","tableData":{"id":3}}],[{"name":"Ernest Essien","house":"9","class":"2F","tableData":{"id":4}},{"name":"Kalikrates","house":"9","class":"1H","tableData":{"id":5}},{"name":"Michael Sungnuma","house":"9","class":"2D3","tableData":{"id":6}},{"name":"Alidu Wonzooya","house":"9","class":"2E","tableData":{"id":7}},{"name":"Shadrach Achambaka","house":"9","class":"2G","tableData":{"id":8}},{"name":"Fidel Taylor","house":"9","class":"2P","tableData":{"id":9}},{"name":"Emmanuel Buabeng","house":"9","class":"2G","tableData":{"id":10}},{"name":"Clement Davour","house":"9","class":"2G","tableData":{"id":11}},{"name":"Kingsley Buadi","house":"9","class":"3N","tableData":{"id":12}},{"name":"Lommo","house":"9","class":"3H","tableData":{"id":13}}]]],[[[{"name":"Michael Norman","house":"9","class":"3B2","tableData":{"id":1}}],[{"name":"Ronald Eyeson","house":"9","class":"3D3","tableData":{"id":3}},{"name":"Kingsley Buadi","house":"9","class":"3N","tableData":{"id":12}},{"name":"Lommo","house":"9","class":"3H","tableData":{"id":13}}]]]]
{Completed_Calls.map(item =>(
        (item.map(obj => (obj.map(stud => (stud.map(fin => <p>{fin.name}</p>))))))))}
        
            <div>   
         {Completed_Calls.map(item =>{
          return(
            <div>
              <h1>{item}</h1>
              {item.map(obj => (obj.map(stud => (stud.map(fin => <p>{fin.name}</p>

      </div>*/

const Completed_Calls = JSON.parse(localStorage.getItem('completed'))

class HistoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: []
      }
  }
  
  componentDidMount(){
      this.setState({
        history: Completed_Calls
      })
      console.log(this.state.history)
    }
  

  render() {
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
                  <div className ="Absent_Present">
                   {stud.map((fin) =>
                 <div className="Names"> {fin.name}  </div>  )}
                  </div>
                 )})}
              </div>
                 )})}
                 
            </div> 
            
          )})}
      </div>
    )}}
       
     /*
     else{
       return(
         <div>
           <h1> No RollCall's Conducted Yet </h1>
         </div>
       )
     }*/
    
export default withStyles(styles)(HistoryPage);


