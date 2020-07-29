import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './Select Styles.css';

const HouseName = JSON.parse(localStorage.getItem('title'))
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function NativeSelects(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    house: JSON.parse(localStorage.getItem('title')),
    class: '',
  });
  localStorage.setItem('credentials',JSON.stringify(state))

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
      <div className="SelectionMenu">
    <div iD ="HouseSelect">
       <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">House</InputLabel>
        <Select
          native
          value={state.house}
          onChange={handleChange}
          label="house"
          inputProps={{
            name: 'house',
            id: 'outlined-age-native-simple',
          }}
        >
          <option value={JSON.parse(localStorage.getItem('title'))}>{HouseName}</option>
         
        </Select>
      </FormControl>
  
    </div>
    <div id ="ClassSelect">
       <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">Class</InputLabel>
        <Select
          native
          value={state.class}
          onChange={handleChange}
          label="class/form"
          inputProps={{
            name: 'class',
            id: 'outlined-age-native-simple',
          }}>
          <option value = {0}> </option>
          <option value = {1}> All </option>
          <option value={100}>Form 1</option>
          <option value={200}>Form 2</option>
          <option value={300}>Form 3</option>
        </Select>
      </FormControl>
      </div>
      </div>
  );
}