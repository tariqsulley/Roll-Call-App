import React, {Component} from 'react';
import './index.css';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ArrowBackSharpIcon from '@material-ui/icons/ArrowBackSharp';
import RefreshIcon from '@material-ui/icons/Refresh';
import UndoIcon from '@material-ui/icons/Undo';
import SaveIcon from '@material-ui/icons/Save';
import DoneIcon from '@material-ui/icons/Done';
import {lightGreen } from '@material-ui/core/colors';
import MaterialUIPickers from './picker.jsx';
import NativeSelects from './Select.jsx';

/*const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: purple[500],
      '&:hover': {
        backgroundColor: purple[700],
      },
    },
  }))(Button);*/
  
  /*onst useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
  }));*/
  
const theme = createMuiTheme({
    palette: {
      primary: lightGreen,
    },
  });
const pr = [];
/*const undo_List = [];*/
var u_list = [];
const u_list_present = [];
const undo_list = []
const MyButton = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
});

const list =  JSON.parse(localStorage.getItem('names'))
const x = []
const creds = JSON.parse(localStorage.getItem('credentials'))

// Checks if the current value in the input field is present 
// in item(the database)....Matches name and class */
const isSearched = searchTerm => item =>
item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
item.class.toLowerCase().includes(searchTerm.toLowerCase());

/*
function Search(props) {
    const { value, onChange, children } = props;
    return (
    <form>
    {children} <input
    type="text" placeholder="Search for student"
    iD="formSearch"
    value={value}
    onChange={onChange} />
    </form> 
    )
}
*/
function Table(props){
    const { list, pattern, onDismiss } = props;
    return (
        <div className="table">  
        {/*
        <div className="table-head">
        <header id="h1">  Name </header>
        <header id="h2"> House </header>
        <header id="h3"> Class</header>
        </div> */}  
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
    <Butt onClick={() => onDismiss(item.tableData.id)} className="button-inline">
    Present
    </Butt>
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
        {/* 
        <div className="table-head">
        <header id="h1">  Name </header>
        <header id="h2"> House </header>
        <header id="h3"> Class</header>
        </div>  
        */}
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
        {/* 
        <div className="table-head">
        <header id="h1">  Name </header>
        <header id="h2"> House </header>
        <header id="h3"> Class</header>
        </div>  
        */}
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

function Butt (props){
            const {
            onClick,
            className,
            children,} = props;
            return (
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
            house: ''
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
            <button onClick={this.toggleView1} className="StartBtn"> StartRollCall </button>
            </div>
            </div>
        );
    }
    
        else{
            return(
                <App parentMethod ={this.toggleView1}/> 
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
            present: [],
            pre: []
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

        /*
        if(creds.class === "100"){
          this.setState({
              list: list.filter(student => student.class[0] === "1")
          })
        }
        else if(creds.class === "200"){
            this.setState({
                list: list.filter(student => student.class[0] === "2")
            })
        }
        else if(creds.class ==="300"){
            this.setState({
                list: list.filter(student => student[0] === "3")
            })
        }*/
        switch(creds.class){

            case "100":
            return this.setState({list: list.filter(student => student.class[0] ==="1")})

            case "200":
            return this.setState({list: list.filter(student => student.class[0] === "2")})

            case "300":
            return this.setState({list: list.filter(student => student.class[0] === "3")})

            case "1":
            return this.setState({list: list})
            
            case "":
            return this.setState({list: []})
        }
    }
    click = () =>{
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
        if(creds.class !== "1"){
        u_list = []
        this.setState({
            list: list.filter(student => student.class[0] === creds.class[0]),
            remaining: 0,
            present: []
        })
    }
    else{
        u_list = []
        this.setState({
            list: list,
            remaining: 0,
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
            }
            else{
                alert("WARNING!!!...There are currently no students left to undo")
            }
            }

    // Removes a selected student from the current list in
    //(item.table.Data.id !== id)...list is henceforth updated
    //to contain those who have not been selected
    onDismiss(id) {
        const isNotId = item => item.tableData.id !== id;
        const updatedList = this.state.list.filter(isNotId);
        const creds = JSON.parse(localStorage.getItem('credentials'))
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

    save(){
         x.push([this.state.present, this.state.list])
        console.log(x)
        const completed_rollcall = localStorage.setItem('completed', JSON.stringify(x))
//Material Table.js Line 542 pprops.columns.findIndex is not a function

    }
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
                value = {searchTerm} onChange={this.onSearchChange}/>
                </div>
                </div>
                <div className="OptionsBottom">
                <div className="OptionsBottomRefresh">
                <MyButton onClick={this.reload} startIcon={<RefreshIcon/>} iD="refresh">
                Refresh
                </MyButton>
                </div>
                <div className="OptionsBottomDone">
                <ThemeProvider theme={theme}>
                <Button variant="contained" color="primary" onClick={this.toggleView2} iD= "RollCallDone"
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
                <div className="form">
                    {/*<Search 
                    value={searchTerm} 
                    onChange={this.onSearchChange}
                    ref={(node) => { this.input = node; }}>
                    Search
                    </Search>*/}
                    </div>
                    </div>
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
                <Button
                variant="contained"
                color="secondary"
                onClick={this.toggleView2}
                startIcon={<ArrowBackSharpIcon />}>
                 Back
                </Button>
            
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
                <Button variant="contained" 
                color = "primary" id="Savebtn"
                startIcon = {<SaveIcon/>} onClick={this.save}> Save </Button>
                </div>
                </div>                
            );
        }
    }
}

export default HomePage;
