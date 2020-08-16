import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Chart from "react-google-charts";
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
});

// Add Function to catch a critical critical bug here
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
      <div style={{ display: 'flex', maxWidth: 900}}>
      <Chart
  width={'500px'}
  height={'300px'}
  chartType="PieChart"
  loader={<div><CircularProgress/></div>}
  data={[
    ['Grade', 'Number Of Students'],
    ['Form 3 ', form_3s],
    ['Form 2', form_2s],
    ['Form 1', form_1s]
  ]}
  options={{
    title: 'Proportion Of Students In The House',
  }}
/>
  </div>
  <Chart
  width={1000}
  height={350}
  chartType="Calendar"
  loader={<div>Loading Chart</div>}
  data={[
    [{ type: 'date', id: 'Date' }, { type: 'number', id: 'Won/Loss' }],
    [new Date(2020,1,25), 37],
    [new Date(2020,3,16), 25],
    [new Date(2020, 8, 16), 58],
    [new Date(2020,8,17), 70]
  ]}
  options={{
    title: 'Club Meeting Attendance',
  }}
  rootProps={{ 'data-testid': '1' }}
/>
    </div>
  );
};


export default withStyles(styles)(Home);
