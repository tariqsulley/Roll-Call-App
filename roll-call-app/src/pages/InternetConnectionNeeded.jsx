import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Snackbars() {
  const classes = useStyles();
  return (
    <div className={classes.root}>    
      <Alert severity="warning">
      <AlertTitle> Alert </AlertTitle>
      An Internet connection is needed to display
      charts of the data!</Alert>
    </div>
  );
}