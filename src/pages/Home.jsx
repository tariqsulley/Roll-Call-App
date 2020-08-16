import React, {useEffect,useState} from "react";
import { withStyles } from "@material-ui/core/styles";
import Chart from "react-google-charts";
import CircularProgress from '@material-ui/core/CircularProgress';
import PresentList from './PresentList.jsx';
import TextField from '@material-ui/core/TextField';
import Snackbars from './InternetConnectionNeeded.jsx'
import './HomeStyles.css'
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
const history = JSON.parse(localStorage.getItem('completed'))
const Data = JSON.parse(localStorage.getItem('completed'))

const total_students = students.length
const form_3s = students.filter(student => student.class[0] === "3").length
const form_2s = students.filter(student => student.class[0] === "2").length
const form_1s =  students.filter(student => student.class[0] === "1").length 
const data = []
var Present_Students = []

const Home = ()=> {
  const [search,Setsearch] = useState('')
  const [names,Setname] = useState([])
  const [origNames, Setorig] = useState([])

  const SearchItem = (event)=>{
    Setsearch(event.target.value)

   const Searchfilter =
    names.filter(student =>{
        return student.name.toLowerCase().includes(search.toLowerCase())
    })
    Setname(Searchfilter)   
     if(search === ''){
      Setname(origNames)
    } 
  }

  const GetDates = ()=>{
    const zip = (arr1, arr2) => arr1.map((k, i) => [k, arr2[i]]);
    var dates = []
    var present_numbers = []
    for(var i =  0; i<history.length; i++){
      dates.push(history[i][0][2])}
  
    dates = dates.flat()
    dates = dates.map(i=> i.Date)
  
    for(var i =  0; i<history.length; i++){
      present_numbers.push(history[i][0][0])}
    var present_numbers = present_numbers.map(arr => arr.length)
    var combined = zip(dates,present_numbers)
    var combined = combined.map(arr => [new Date(arr[0].slice(0,4), arr[0].slice(5,7) - 1 , arr[0].slice(8,10) ), arr[1]])
    for(var i = 0; i<combined.length; i++){
      data.push(combined[i])
    }

    //var result = [];
    var df = []

    for(var i = 0; i<Data.length; i++){
      df.push(Data[i][0][0])}

    var df = df.flat()
/*
    df.forEach((item) => {
    let resultData = {
      name: item.name,
      count: 0
    }
      let count = df.filter((contact) => {
      return contact.name === item.name;
      });
    resultData.count = count.length;
    result.push(resultData);

     Present_Students = [...result]
});
*/

let result = Object.values(df.reduce((acc, {name}) => {
  if (acc[name] === undefined)
      acc[name] = {name: name, count: 1};
  else
      acc[name].count++;
  return acc;
},{}));

Present_Students = [...result]
Setname([...result])
Setorig([...result])

}

  useEffect(() => {
    GetDates();
    
  }, []);



  const click = ()=>{
    alert(Present_Students)
  }

  return (
    <div>

      <div>
        <h1> Home Page Here</h1>
        <button onClick={click}> Display Data</button>
        <p> Total Number Of Students In The House: </p>
        <p> Total Number Of Form 3 Students: </p>
        <p> Total Number Of Form 2 Students: </p>
        <p> Total Number Of Form 1 Students: </p>
      </div>
      
      <div>

      <div className="AttendanceBox">
      <div className = "NumOfCalls">
        Number of Roll Calls: {history.length}
      </div>
      <div className="TextField">
        <TextField label="Search" variant="outlined" value ={search} onChange={SearchItem}/>
      </div>
      <div className="PresentList">
        {names.map(student=>(
          <PresentList name = {student.name} times = {student.count}/>
        ))}
      </div>
      </div>

      </div>
      <div className ="ChartContainer">
      <div className="ChartEntrance">
         <Snackbars/>
      </div>

      <div className="ClassPieChart" style={{ display: 'flex', maxWidth: 900}}>
      <Chart
        width={'500px'}
        height={'300px'}
        chartType="PieChart"
        loader={<div className = "ProgressCircle"><CircularProgress/></div>}
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
     
      <div className="Timeline">    
       <Chart
        width={1000}
        height={500}
        chartType="Calendar"
        loader={<div className="ProgressCircle"><CircularProgress/></div>}
        data={[
          [{ type: 'date', id: 'Date' }, { type: 'number', id: 'Won/Loss' }],
          ...data.map(arr=> [arr[0], arr[1]])
        ]}
        options={{
          title: 'Club Meeting Attendance',
        }}
        rootProps={{ 'data-testid': '1' }}
      />
      </div>
      </div>
 
      </div>
  );
};



export default withStyles(styles)(Home);
