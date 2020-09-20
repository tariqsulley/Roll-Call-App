import React, {useEffect,useState} from "react";
import { withStyles } from "@material-ui/core/styles";
import Chart from "react-google-charts";
import CircularProgress from '@material-ui/core/CircularProgress';
import PresentList from './PresentList.jsx';
import TextField from '@material-ui/core/TextField';
import Snackbars from './InternetConnectionNeeded.jsx';
import Sort from './SortBy';
import './HomeStyles.css';

const styles = theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
});

const students = JSON.parse(localStorage.getItem('names'))
const history = JSON.parse(localStorage.getItem('completed'))
const Data = JSON.parse(localStorage.getItem('completed'))

const total_students = students === null || students.some(arr => arr.name === undefined || arr.class === undefined) ? null: students.length
const form_3s = students === null  || students.some(arr => arr.name === undefined || arr.class === undefined) ? null:students.filter(student => student.class[0] === "3").length
const form_2s = students === null || students.some(arr => arr.name === undefined || arr.class === undefined) ? null:students.filter(student => student.class[0] === "2").length
const form_1s =  students === null || students.some(arr => arr.name === undefined || arr.class === undefined) ? null:students.filter(student => student.class[0] === "1").length 

const data = []


//Search only works when I tap inside and add space
const Home = ()=> {
  const [search,Setsearch] = useState('')
  const [names,Setname] = useState([])
  const [origNames, Setorig] = useState([])
  const [origAbsentees, SetorigAbsentees] = useState([])
  
  const SearchItem = (event)=>{
    Setsearch(event.target.value)
    const SortBy = JSON.parse(localStorage.getItem('Sort'))
    const Searchfilter =
      (SortBy === "1" || SortBy[0] === undefined ? origNames:origAbsentees).filter(student =>{
          return student.name.toLowerCase().includes(search.toLowerCase())
      })
    
    if(search === null || search === undefined || search === " "){
      Setname(SortBy ==="1"|| SortBy[0] === undefined ? origNames:origAbsentees)
    }
    else{
      Setname(Searchfilter)
    }
    
  }

  const GetDates = ()=> {
    
    const zip = (arr1, arr2) => arr1.map((k, i) => [k, arr2[i]]);
    var dates = []
    var present_numbers = []

    if(history !== null){

    for(var i =  0; i<history.length; i++){
      dates.push(history[i][0][2])}
    }

    else{
      console.log('')
    }
  
    dates = dates.flat()
    dates = dates.map(i=> i.Date)
    
    if(history !==null){

    for(var j =  0; j<history.length; j++){
      present_numbers.push(history[j][0][0])}
    }

    else{
      console.log('')
    }

    var present_values = present_numbers.map(arr => arr.length)
    var comb = zip(dates,present_values)
    var combined = comb.map(arr => 
    [new Date(arr[0].slice(0,4), arr[0].slice(5,7) - 1 , arr[0].slice(8,10) ), arr[1]])
    
    //Dates roll calls were conducted and total number of students present
    // is retrieved and stored in the data variable
    for(var z = 0; z<combined.length; z++){
      data.push(combined[z])
    }

    //var result = [];
    var df = []
    var absent_df = []

    if(Data !== null){
    for(var x = 0; x<Data.length; x++){
      df.push(Data[x][0][0])}}
    else{
      console.log('')
    }

    if(Data !== null){
      for(var y = 0; y<Data.length; y++){
        absent_df.push(Data[y][0][1])}}
      else{
        console.log('')
    }

    var flattened = df.flat()
    var absent_flattend = absent_df.flat()
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

//Number of times each student is present in a roll call
// is retrieved and stored in the result variable
  let result = Object.values(flattened.reduce((acc, {name}) => {
    if (acc[name] === undefined)
        acc[name] = {name: name, count: 1};
    else
        acc[name].count++;
    return acc;
  },{}));

  let absentees = Object.values(absent_flattend.reduce((acc, {name}) => {
    if (acc[name] === undefined)
        acc[name] = {name: name, count: 1};
    else
        acc[name].count++;
    return acc;
  },{}));


  Setname([...result])
  Setorig([...result])

  SetorigAbsentees([...absentees])

}

  useEffect(() => {
    GetDates();
  }, []);

  const StudentNumbers = ()=> {
    return(
        <div className="Student_Numbers">
              <p className="Num"> Total Number Of Students In The Club: {total_students} </p>
              <p className = "Num"> Total Number Of Form 3 Students: {form_3s} </p>
              <p className = "Num"> Total Number Of Form 2 Students: {form_2s} </p>
              <p  className = "Num"> Total Number Of Form 1 Students: {form_1s} </p>
        </div>
      )
    }

  const Charts = ()=> {
    return(
      <div>
        <div className="ClassPieChart" style={{ display: 'flex', maxWidth: 900}}>
        <Chart
          width={'500px'}
          height={'300px'}
          chartType="PieChart"
          loader={<div className = "ProgressCircle"></div>}
          data={[
            ['Grade', 'Number Of Students'],
            ['Form 3 ', form_3s],
            ['Form 2', form_2s],
            ['Form 1', form_1s]
          ]}
          options={{
            title: 'Proportion Of Students In The Club',
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
    )
  }

if(total_students !==null || form_3s !== null || form_2s !== null || form_1s !== null 
  || students !== null || Data !== null || history !== null){
  return (
    <div>
      <div className="TopDisplayWrapper">
      <StudentNumbers/>
      <div className="AttendanceWrapper">
      <div>
      
      <div className="AttendanceBox">
      <div className = "NumOfCalls">
        Number Of Roll Calls: {history === null ? null:history.length}
      </div>

      <div className = "HomePageOptions">

      <div className="TextField">
        <TextField label="Search" variant="outlined" value ={search} onChange={SearchItem}/>
      </div>

      <div className = "SortField">
        <Sort/>
      </div>
      </div>

      <div className="PresentList">
        {names.map(student=>(
          <PresentList key = {student.name} name = {student.name} times = {student.count}/>
        ))}
      </div>

      </div>

      </div>
      </div>

      </div>

      <div className ="ChartContainer">

      <div className="ChartEntrance">
         <Snackbars/>
      </div>
         <Charts/> 
      </div>

      </div>
  );
 }
 else{
   return(
     <div>
       <StudentNumbers/>
     </div>
   )
 }
};

export default withStyles(styles)(Home);
