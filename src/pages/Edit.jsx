import React,{Component} from "react";
import { withStyles } from "@material-ui/core/styles";
import MaterialTable from 'material-table';
import Image from './Presec.png';
import './EditStyles.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import EditIcon from "@material-ui/icons/Edit";
import ArrowBackSharpIcon from '@material-ui/icons/ArrowBackSharp';
import SaveIcon from '@material-ui/icons/Save';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {lightGreen} from '@material-ui/core/colors';

import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const styles = theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
});
const theme = createMuiTheme({
  palette: {
    primary: lightGreen,
  },
});
//const names = JSON.parse(localStorage.getItem('names'))
//var random_names = []
const HouseName = localStorage.getItem('title')

/*
const names_length = JSON.parse(localStorage.getItem(('names')))
const remaining = names_length.length - 3
*/
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

class MaterialTableDemo extends Component {
    constructor(props){
      super(props);
      this.state = {
      columns: [
        { title: 'Name', field: 'name' },
        { title: 'House', field: 'house' },
        { title: 'Class', field: 'class'},
       
      ],
      title: '',
      data: [
       
      ],
    }
    this.Search = this.Search.bind(this);
  }
 

   Search(event){
    this.setState({
      title: event.target.value
    })
  }

// After page renders, the names of the students and their house
//is set into state 
  componentDidMount() {
    const Values =localStorage.getItem('names')
    if(Values){
      this.setState({
        data: JSON.parse(Values)
      })
    }
    
    if(HouseName){
      this.setState({
        title: JSON.parse(HouseName)
      })
    }
  }
  
  // Before page renders, the names of the students and the name
  // of the house are set to localstorage 
  componentDidUpdate() {
    localStorage.setItem('names',JSON.stringify(this.state.data))
    localStorage.setItem('title', JSON.stringify(this.state.title))  
   }

  render(){
    return (
      <div>
      <div className="textfield">
      <TextField variant = "outlined" value ={this.state.title} onChange = {this.Search} label ="House Name"/>
      </div>
      <MaterialTable
        title={this.state.title}
        columns={this.state.columns}
        icons={tableIcons}
        data= {this.state.data}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                this.setState((prevState) => {
                  const data = [...prevState.data];
                  data.push(newData);
                  return { ...prevState, data };
                });
              }, 600);
            }),

          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  this.setState((prevState) => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    return { ...prevState, data };
                  });
                }
              }, 600);
            }),

          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                this.setState((prevState) => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevState, data };
                });
              }, 600);
            }),
        }}
      />
      </div>
    );
  }}
/*
  function CardNames(){
    return(
      useEffect( () => {
        for(var i =0; i<df.length; i++){
          names.push((df[i].name))}
      }, [])
    )
  }*/


class Page extends Component{
  constructor(props){
    super(props);
    this.state = {
      changeview: true,
      color: 'green'
    }
    this.tog = this.tog.bind(this);
    this.save = this.save.bind(this)
  }
  
   tog(){   
    this.setState(state=>{
      return{changeview: !state.changeview}
    })
  }
  

 save(){
   this.setState(state=>{
     return{changeview: !state.changeview}
   },
   )
   window.location.reload()
   
   // ClassNames are retrieved from localstorage and
   //stored in single class variable to enable it to be 
   //retrieved in NewRollCall
   //HOW TO TAKE USER INPUT IN JS*/ 
  const ClassNames = JSON.parse(localStorage.getItem('names'))
  
  const classes = []

  for(var i =0; i < ClassNames.length; i++){
    classes.push((ClassNames[i].class))}
    var singleclass = []

  for(var j = 0; j < classes.length; j++){
    singleclass.push((classes[j][0]))}
  singleclass = new Set(singleclass)
  
  const form = []
  for(var x = 0; x < [...singleclass].length; x++ ){
    form.push([...singleclass][x])
  }
  localStorage.setItem('class',JSON.stringify(form))
 } 

  componentDidMount() {
    /*setTimeout(()=>{
      this.setState({color:'blue'})
    },3000)
    for (var i = 0; i<3; i++){
      random_names.push(names[Math.floor(Math.random() * names.length)])
      
    }*/
  }
  
  render(){
  if(this.state.changeview ){
    return (
    <div className = "EditHome">
    {/*    <h1 style = {{color:this.state.color}}> Edit Page Here</h1>
    */}
     <div className = "EditMap">
     {/*
     {random_names.map(name =>(
     <EditCard name = {name.name}/>
     ))}
     <p>and {remaining} others</p>* 
     Reorder names in ascending/desceding order by surname
     Use regex to detect white space in two word names and 
     apply reordering to [1th] name. For names,
     that have more than two words, apply reordering to the
     last name.
     IN SETTINGS APPLY FUNCTIONALITY TO DELETE ALL FORM 3s.
     ALSO, ADD FUNCTION TO UPGRADE FORM 1s AND 2s TO NEXT GRADE.
     AND FUNCTION TO DEGRADE
     ALSO ADD FUNCTIONALITY TO EXPORT COMPLETED ROLL CALL IN HISTORY
     TO A MOBILE PHONE.
     WHEN UNDO IS DONE, DISPLAY ALERT FOR ABOUT 2s SAYING..EX: Added Prince Asiedu
     TECHNOVATION WORLD CHALLENGE (Nigerian Girls Win $10,000 by developing app)
     Screenshot_20190102-224555.png*/
     }
     <h1> {HouseName}</h1>
     <img src = {Image} className= "EditCardImg" alt = "Presec_Logo"/>
     <Button variant="contained"startIcon ={<EditIcon/>} color ="primary" 
     onClick ={this.tog} className = "EditBtn"> 
     Edit Data
     </Button> 
     </div>
      </div>
  );
}
  else{
    return(
      <div className="EditTablePage">
      <div className="EditPageBtns">
      <Button variant = "contained" startIcon = {<ArrowBackSharpIcon/>} color = "secondary" 
      onClick={this.tog}>
       Back </Button>
       <ThemeProvider theme={theme}>
      <Button variant = "contained" startIcon ={<SaveIcon/>} color = "primary"  
      onClick={this.save}>Save</Button>
      </ThemeProvider>
      </div>
      <MaterialTableDemo/>

      </div>
    );
  }
 }
}

export default withStyles(styles)(Page);
