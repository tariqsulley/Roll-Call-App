import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
});
// Add Functional to catch a critical critical bug here
//all places in code where I get item from local storage 
//and instanlty use it's value will crash on a different pc
//because there's nothing intially in their local storage
const students = JSON.parse(localStorage.getItem('names'))
const total_students = students.length
const form_3s = students.filter(student => student.class[0] === "3").length
const form_2s = students.filter(student => student.class[0] === "2").length
const form_1s =  students.filter(student => student.class[0] === "1").length
const Home = props => {
  return (
    <div>
      <div>
        <h1> Home Page Here</h1>
        <p> Total Number Of Students In The House: </p>
        <p> Total Number Of Form 3 Students: </p>
        <p> Total Number Of Form 2 Students: </p>
        <p> Total Number Of Form 1 Students: </p>
      </div>
    </div>
  );
};



export default withStyles(styles)(Home);
