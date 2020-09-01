import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import PaymentIcon from "@material-ui/icons/Payment";
import ReceiptIcon from "@material-ui/icons/Receipt";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const [state, setState] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(false);
  };
  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{ backgroundColor: "rgba(48,78,76,0.85)" }}
      >
        <Toolbar>
          <IconButton
            onClick={() => {
              setState({ left: true });
            }}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Home
          </Typography>

          <Link
            to={"/register"}
            style={{ color: "white", textDecoration: "none" }}
          >
            <Button color="black" style={{ backgroundColor: "white" }}>
              Crear Cuenta
            </Button>
          </Link>
        </Toolbar>
      </AppBar>

      <SwipeableDrawer
        className={classes.list}
        anchor={"left"}
        open={state}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <List className={classes.list}>
          <Link
            to={"/reload"}
            style={{ color: "black", textDecoration: "none" }}
          >
            <ListItem button key={1}>
              <ListItemIcon>
                <AttachMoneyIcon />
              </ListItemIcon>
              <ListItemText primary={"Recargar billetera"} />
            </ListItem>
          </Link>
          <Link
            to={"/saldo"}
            style={{ color: "black", textDecoration: "none" }}
          >
            <ListItem button key={2}>
              <ListItemIcon>
                <PaymentIcon />
              </ListItemIcon>
              <ListItemText primary={"Consultar saldo"} />
            </ListItem>
          </Link>
          <Link
            to={"/payment"}
            style={{ color: "black", textDecoration: "none" }}
          >
            <ListItem button key={2}>
              <ListItemIcon>
                <ReceiptIcon />
              </ListItemIcon>
              <ListItemText primary={"Realizar pago"} />
            </ListItem>
          </Link>
        </List>
      </SwipeableDrawer>
    </div>
  );
}
