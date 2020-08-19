import React, {Component} from 'react';
import './index.css';
//import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ArrowBackSharpIcon from '@material-ui/icons/ArrowBackSharp';
import RefreshIcon from '@material-ui/icons/Refresh';
import UndoIcon from '@material-ui/icons/Undo';
import SaveIcon from '@material-ui/icons/Save';
import DoneIcon from '@material-ui/icons/Done';
import PlayArrow from '@material-ui/icons/PlayArrow';
import {lightGreen } from '@material-ui/core/colors';
import MaterialUIPickers from './picker.jsx';
import NativeSelects from './Select.jsx';
import AlertMessage from './Alerts'

const theme = createMuiTheme({
    palette: {
      primary: lightGreen,
    },
  });

const pr = [];
var u_list = [];
const u_list_present = [];
const list =  JSON.parse(localStorage.getItem('names'))
const x = []

// Checks if the current value in the input field is present 
// in item(the database)....Matches name and class */
const isSearched = searchTerm => item =>
item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
item.class.toLowerCase().includes(searchTerm.toLowerCase());

function Table(props){
    const { list, pattern, onDismiss } = props;
    return (
    <div className="table">      
    {list.filter(isSearched(pattern)).map(item =>
    <div key={item.tableData.id} className="table-row">
    <span style={{ width: '40%' }}>
    {item.name}
    </span>
    <span style={{ width: '30%' }}>
    {item.house}
    </span>
    <span style={{ width: '10%' }}>
    {item.class}
    </span>
    <span style={{ width: '10%' }}>
    <PresentButton onClick={() => onDismiss(item.tableData.id)} className="button-inline">
     Present
    </PresentButton>
    </span>
    </div>
    )} 
    </div> 
    );  
}

function TablePresent(props){
    const { list, pattern } = props;
    return (
    <div className="table-present">  
    {list.filter(isSearched(pattern)).map(item =>
    <div key={item.tableData.id} className="table-row">
    <span style={{ width: '40%' }}>
    {item.name}
    </span>
    <span style={{ width: '30%' }}>
    {item.house}
    </span>
    <span style={{ width: '10%' }}>
    {item.class}
    </span>
    </div>
    )} 
    </div> 
    );
}

function TableAbsent(props){
    const { list, pattern } = props;
    return (
    <div className="Table-absent">  
    {list.filter(isSearched(pattern)).map(item =>
    <div key={item.tableData.id} className="table-row">
    <span style={{ width: '40%' }}>
    {item.name}
    </span>
    <span style={{ width: '30%' }}>
    {item.house}
    </span>
    <span style={{ width: '10%' }}>
    {item.class}
    </span>
    </div>
    )} 
    </div> 
    );  
}


function PresentButton (props){
        const {onClick,className,children} = props;
        return(
            <button
            onClick={onClick}
            className={className}
            type="button">
            {children}
            </button>
        );
    }

  const Empty = (props) => {
    return <h1 id = "ErrorHead"> Sorry No Match Found :(</h1>
  }


  class HomePage extends Component{
    constructor(props){
        super(props);
        this.state = {
            homeview: true,
            clas: '',
            house: '',
     }
        this.toggleView1 = this.toggleView1.bind(this)
        this.ChangeClass = this.ChangeClass.bind(this)
        this.ChangeHouse = this.ChangeHouse.bind(this)
        
     }

     ChangeClass(value){
        this.setState({
            house: value
        })
    }

  ChangeHouse(value){
        this.setState({
            clas: value
        })
    }
  
    toggleView1(){
        this.setState({
            homeview : !this.state.homeview
        })
    }

    render(){
        if(this.state.homeview){
        return(
            <div className="HomePage">
            <div className="HomeOptions">
            <MaterialUIPickers/>
            <NativeSelects />
            <Button color = "primary" variant = {list === null || list.length === 0 
            || list.some(arr => arr.name === undefined) ? "disabled":"contained" }  
            onClick={this.toggleView1} startIcon={<PlayArrow/>} className = "StartBtn"> Start RollCall </Button>
            </div>
            </div>
        );
    }
    
        else{
            return(
                <App parentMethod = {this.toggleView1}/> 
            );
        }
    }
}



class App extends Component {
    constructor(props){
        super(props); 
        this.state = {
            list: list,
            searchTerm: '',
            empty: 0,
            remaining: 0,
            progress: true,
            alert_display:false,
            present: [],
            pre: [],
            DateNTime: []   
        };

        this.onDismiss = this.onDismiss.bind(this)
        this.onSearchChange = this.onSearchChange.bind(this)
        this.toggleView2 = this.toggleView2.bind(this)
        this.reload = this.reload.bind(this)
        this.undo = this.undo.bind(this)
        this.save = this.save.bind(this)
    
    }

    componentDidMount() {
        const creds = JSON.parse(localStorage.getItem('credentials'))
        const Values = localStorage.getItem('completed')
        const listlength = list.filter(student => student.class[0] === creds.class[0])
        
        this.setState({
            data: JSON.parse(Values)
        })

        this.setState({
            DateNTime: new Array ({'Date': JSON.parse(localStorage.getItem('DateNTime'))})
        })

        if(creds.class !== "1"){
        this.setState({
            remaining: listlength.length
        })}

        else{
            this.setState({
                remaining: list.length
            })
        }
    
        switch(creds.class){

            case "100":
            return this.setState({list: list.filter(student => student.class[0] ==="1")})

            case "200":
            return this.setState({list: list.filter(student => student.class[0] === "2")})

            case "300":
            return this.setState({list: list.filter(student => student.class[0] === "3")})

            case "1":
            return this.setState({list: list})
            
            default: 
            return this.setState({list: []})
        }
    }

    click = (props) =>{
        this.props.parentMethod();
        u_list = []
    }
  
    toggleView2(){
        this.setState(state =>{
           return {progress: !state.progress}
        })
    }

    reload(){
        const creds = JSON.parse(localStorage.getItem('credentials'))
        const listlength = list.filter(student => student.class[0] === creds.class[0])
        if(creds.class !== "1"){
        u_list = []
        this.setState({
            list: list.filter(student => student.class[0] === creds.class[0]),
            remaining: listlength.length,
            present: []
        })
    }

    else{
        u_list = []
        this.setState({
            list: list,
            remaining: list.length,
            present: []
        })
      }
    }

    onSearchChange(event) {
        this.setState({ searchTerm: event.target.value });
        if(document.getElementsByClassName("table")[0]["innerHTML"].length === 0){ 
            this.setState({
                empty: 1
            })}
        else{
            this.setState({
                empty: 0
            })}
        }

    undo(){
            const {list, present} = this.state
            if(present.length > 0){
            this.setState({
                list: list.concat(present[present.length - 1])
            })
            present.pop()
            this.setState({
                remaining: list.length + 1
            })
            this.setState({alert_display: false})
            }
            else{
                this.setState({alert_display:true})      
            }
        }

    // Removes a selected student from the current list in
    //(item.table.Data.id !== id)...list is henceforth updated
    //to contain those who have not been selected
    onDismiss(id) {
        const isNotId = item => item.tableData.id !== id;
        const updatedList = this.state.list.filter(isNotId);
        //const creds = JSON.parse(localStorage.getItem('credentials'))
        u_list_present.push(updatedList);
        this.setState({ list: updatedList });
        this.setState({remaining: this.state.list.length - 1 })

        // diff is the difference, i.e. the difference between the total students
        //and those who are absent
        const diff = 
        this.state.list.filter(item => updatedList.every(i => item.tableData.id !== i.tableData.id));
        u_list.push(diff)

        
        //Recursion and decrementing depth by 1 is used for each level of depth.
        //Array.prototype.reduce() and Array.prototype.concat() is used to merge 
        //arrays. Base case, depth equal to 1 stops recursion.
        //  u_list is flattened to remove multiple arrays 
        const flatten = (arr, depth = 1) =>
        arr.reduce((a, v) => a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v), []);
        u_list = flatten(u_list)

        /*console.log((list.filter(student => student.class[0] === creds.class[0])))*/
        pr.push(id);
        this.setState({
            present: u_list
        })
        this.setState({
            pre: pr
        })
    }
    
    componentDidUpdate() {
        localStorage.setItem('completed', JSON.stringify(this.state.data)) 
    }

    save(){
        x.push([this.state.present, this.state.list, this.state.DateNTime])
        const complete = JSON.parse(localStorage.getItem('completed'))

        if(complete !== null){
        this.setState((prevState) => {
            const data = [...prevState.data];
            data.push(x);
            return { ...prevState, data };
          })}

        else{
            this.setState( () => {
                const data = [];
                data.push(x)
                return {data}
            })
        }
      this.setState({
          progress: !this.state.progress
      })
    }
    //Material Table.js Line 542 pprops.columns.findIndex is not a function   
        render() {
            const { searchTerm, list,empty,present } = this.state;
            if(this.state.progress){
            return (
                <div className="page">
                <div className="interactions">
                <div className = "studentsleft">
                Students Left: {this.state.remaining}
                </div>
                <div className ="RowCallOptions">
                <div className="OptionsTopBtn">
                
                <Button
                variant="contained"
                color="secondary"
                onClick={this.click}
                startIcon={<ArrowBackSharpIcon />} iD ="Back">
                Back
                </Button>
                </div>

                <div className="OptionsTopSearch">
                <TextField id="outlined-basic" label="Search" variant="outlined"
                value = {searchTerm} onChange= {this.onSearchChange} />
                </div>
                </div>
                <div className="OptionsBottom">

                <div className="OptionsBottomRefresh">
                <Button variant="contained"
                color="primary" onClick={this.reload} startIcon={<RefreshIcon/>} iD="refresh">
                Refresh
                </Button>
                </div>

                <div className="OptionsBottomDone">
                <ThemeProvider theme={theme}>
                <Button variant={"contained"} color="primary" onClick={this.toggleView2} iD= "RollCallDone"
                startIcon={<DoneIcon/>}>
                Done
                </Button>
                </ThemeProvider>
                </div>

                <div className="OptionsBottomUndo">
                <Button variant="contained" color="primary" onClick={this.undo} iD= "Done"
                startIcon={<UndoIcon/>}>
                Undo
                </Button>
                </div>
                
                </div>
                </div>
                
                {this.state.alert_display === true? <AlertMessage type="warning" message="There are currently no students left to undo"/>: null}
                <Table
                list={list}
                pattern={searchTerm}
                onDismiss={this.onDismiss}/>
                { empty === 1 ? <Empty/>: null }
                
                </div> 
             );
        }
        else{  
            return(
                <div className="done">

                <div className ="BackBtn">
                <Button
                variant="contained"
                color="secondary"
                onClick={this.toggleView2}
                startIcon={<ArrowBackSharpIcon />}>
                 Back
                </Button>
                </div>

                <div className="status_header">
                <p> Number of students present: {this.state.present.length}</p>
                <p> Number of students absent: {this.state.remaining} </p>
                </div>

                <div className = "student_background">
                <div className = "student_status">
                <TablePresent
                    list={present}
                    pattern={searchTerm}
                    className="Table-present"/>
                <TableAbsent 
                    list={list}
                    pattern={searchTerm}/>
                </div>
                </div>

                <div className="btnContainer">
                <Button variant={list.length === 0 & present.length === 0 ? "disabled":"contained"}
                color = "primary" id="Savebtn"
                startIcon = {<SaveIcon/>} onClick={this.save}> Save </Button>
                </div>

                </div>                
            );
        }
    }
}

export default HomePage;
