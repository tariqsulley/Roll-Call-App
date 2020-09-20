import React, { useState, Fragment } from "react";
import clsx from "clsx";
import { /*Router*/ Route, Link ,BrowserRouter} from "react-router-dom";
import { createBrowserHistory } from "history";
import Divider from '@material-ui/core/Divider';
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import lightGreen from '@material-ui/core/colors/purple';

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AddIcon from '@material-ui/icons/Add';
import HistoryIcon from '@material-ui/icons/History';
import EditIcon from '@material-ui/icons/Edit';
import SettingsIcon from '@material-ui/icons/Settings';
import HomeIcon from '@material-ui/icons/Home';
import MoneyIcon from '@material-ui/icons/AttachMoney';

import HomePage from "../pages/App";
import Home from "../pages/Home";
import History from "../pages/History";
import Edit from "../pages/Edit";
import Settings from "../pages/Settings";
import Finances from "../pages/Finances"

/*import {withRouter} from 'react-router-dom';*/

const drawerWidth = 240;
const history = createBrowserHistory();

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  drawerPaper: {
    position: "relative",
    width: drawerWidth
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  toolbarMargin: theme.mixins.toolbar,
  aboveDrawer: {
    zIndex: theme.zIndex.drawer + 1
  },
  palette:{
    primary:lightGreen
  }
});

const MyToolbar = withStyles(styles)(({ classes, title, onMenuClick }) => (
  <Fragment>
    <AppBar className={classes.aboveDrawer}>
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          color="inherit"
          aria-label="Menu"
          onClick={onMenuClick}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" className={classes.flex}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
    <div className={classes.toolbarMargin} />
  </Fragment>
));

const MyDrawer = withStyles(styles)(
  ({ classes, variant, open, onClose, onItemClick }) => (
    <BrowserRouter history={history}>
      <Drawer
        variant={variant}
        open={open}
        onClose={onClose}
        classes={{
          paper: classes.drawerPaper
        }}>
        <div
          className={clsx({
            [classes.toolbarMargin]: variant === "persistent"
          })}/>

        <List>

          <ListItem button component={Link} to="./" onClick={onItemClick("Home")}>
          <ListItemIcon><HomeIcon/> </ListItemIcon>
          <ListItemText>Home</ListItemText>
          </ListItem>

          <ListItem button component={Link} to="./Grid" onClick={onItemClick("New Roll Call")}>
          <ListItemIcon><AddIcon/></ListItemIcon>
          <ListItemText>New Roll Call</ListItemText>
          </ListItem>

          <ListItem button component={Link} to ="./History" onClick={onItemClick("History")}>
          <ListItemIcon><HistoryIcon/></ListItemIcon>
          <ListItemText>History</ListItemText>
          </ListItem>

          <ListItem button
          component={Link} to ="./Edit" onClick={onItemClick("Edit")}>
          <ListItemIcon><EditIcon/></ListItemIcon>
          <ListItemText>Edit</ListItemText>
          </ListItem>  
        
        <ListItem button 
        component={Link} to ="./Finances" onClick={onItemClick("Finances")}>
        <ListItemIcon><MoneyIcon/></ListItemIcon>
        <ListItemText>Finances</ListItemText>
        </ListItem>

        </List>
        
        <Divider/>

        <List>
        <ListItem button 
        component={Link} to ="./Settings" onClick={onItemClick("Settings")}>
        <ListItemIcon><SettingsIcon/></ListItemIcon>
        <ListItemText>Settings</ListItemText>
        </ListItem>
        </List>

      </Drawer>
      <main className={classes.content}>
        <Route exact path="/" component={Home} />
        <Route path="/Grid" component={HomePage} />
        <Route path = "/history" component = {History} />
        <Route path = "/Edit" component ={Edit}/>
        <Route path = "/settings" component ={Settings}/>
        <Route path = "/Finances" component = {Finances}/>
      </main>
    </BrowserRouter>
  )
);

function AppBarInteraction({ classes, variant }) {
  const [drawer, setDrawer] = useState(false);
  const [title, setTitle] = useState("Roll Call App");

  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

  const onItemClick = title => () => {
    setTitle(title);
    setDrawer(variant === "temporary" ? false : drawer);
    setDrawer(!drawer);
  };

  return (

    <div className={classes.root}>
      <MyToolbar title={title} onMenuClick={toggleDrawer} />
      <MyDrawer
        open={drawer}
        onClose={toggleDrawer}
        onItemClick={onItemClick}
        variant={variant}
      />
    </div>
  );
}

export default  withStyles(styles)(AppBarInteraction);
