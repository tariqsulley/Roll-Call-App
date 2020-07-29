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

//const Completed_Calls = JSON.parse(localStorage.getItem('completed'))

/*const flatArray =  Completed_Calls.map(
  (childArray) => {(childArray.map((childElement) => 
    <div>
        <h1> {childArray.name} </h1>
    </div>
    ))}
)*/


const Page2 = props => {
  return (
    <div>
      <div>
       <h1>Hello</h1>
      </div>
    </div>
  );
};



export default withStyles(styles)(Page2);
