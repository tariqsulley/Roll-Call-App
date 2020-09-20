import React, { Component } from 'react';
import './FinancesStyles.css';

import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
//import EditIcon from "@material-ui/icons/Edit";
import ArrowBackSharpIcon from '@material-ui/icons/ArrowBackSharp';
import SaveIcon from '@material-ui/icons/Save';
//import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
//import {lightGreen} from '@material-ui/core/colors';
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
        { title: 'Amount Paid (In Cedis)', field: 'Amount Paid' },
      ],
      data: [  ],
    }
  }
  
  componentDidMount() {
    var paid = localStorage.getItem('Dues')
    if(paid){
      this.setState({
        data: JSON.parse(paid)
      })
    } 
  }
  
  componentDidUpdate() {
    localStorage.setItem('Dues', JSON.stringify(this.state.data))
   }

  render(){
    return (
      <div>

      <MaterialTable
        title={"Club Finances"}
        columns={this.state.columns}
        icons={tableIcons}
        data= {this.state.data}
        options={{exportButton: true,exportAllData: true}}
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

class Finances extends Component{
    constructor(props){
        super(props);

        this.state = {
            FinanceView: false,
            amount: ''
        }

        this.ChangeView = this.ChangeView.bind(this)
        this.save = this.save.bind(this)
    }

    ChangeView(){
        this.setState({
            FinanceView: !this.state.FinanceView
        })
    }

    save(){
        this.setState(state=>{
          return{FinanceView: !state.FinanceView}
        },
        )
        window.location.reload()
    }

    componentDidMount(){
        const students = JSON.parse(localStorage.getItem('Dues'))
        var paid = students === null ? 
        null:students.filter(i => i["Amount Paid"] >= 1).map(i => parseInt(i["Amount Paid"]))

        var total = students === null || paid.length === 0 ?
        null:paid.reduce( (acc,val) => acc + val)        

        this.setState({
            amount: total
        })
 
    }

    componentDidUpdate(){
        localStorage.setItem('Amount', this.state.amount)
    }

    render(){
        if(!this.state.FinanceView){
        return(
            <div className="FinanceHomePage">
                <h1> Manage Club Finances</h1>
                <button onClick={this.ChangeView}> Edit Finances</button>
                <p> Revenue Made: {this.state.amount === null?0:this.state.amount} cedi(s)</p>
            </div>
        )
    }
        else{
            return(
                <div>
                    
                    <div className = "EditFinanceBtn">
                    <Button variant = "contained" startIcon ={<ArrowBackSharpIcon/>} color = "secondary" 
                    onClick={this.ChangeView}> Back </Button>
                    <Button variant = "contained" startIcon ={<SaveIcon/>} color = "primary"  
                     onClick={this.save}>Save</Button>
                    </div>

                    <MaterialTableDemo/>
                    
                </div>
            )
        }
    }
}

export default Finances;