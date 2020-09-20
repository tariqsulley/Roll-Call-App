import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './Select Styles.css';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120,
    marginTop: 27,
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
}));

export default function Sort() {
  const classes = useStyles();
  const [sort, setSort] = React.useState([])
  localStorage.setItem('Sort', JSON.stringify(sort))

  const handleChange = (event) =>{
    setSort(event.target.value)
  }

  return (
    <div>
    <div>
       <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">SortBy</InputLabel>
        <Select
          native
          value={sort}
          onChange={handleChange}
          label="class/form"
          inputProps={{
            name: 'SortBy',
            id: 'outlined-age-native-simple',
          }}>
          <option value = {1}> Present </option>
          <option value = {2}> Absent </option> 
        </Select>
      </FormControl>
      </div>
      </div>
  );
}