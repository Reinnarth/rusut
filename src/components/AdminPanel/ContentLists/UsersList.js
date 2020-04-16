import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),

    // textAlign: "left",
    color: theme.palette.text.primary,
  },
}));

export default function UsersList(props) {
  const classes = useStyles();
  const users = useSelector((state) => state.adminReducer.users);
  return (
    <div>
      {users.map((user, index) => {
        return (
          <Grid container key={index}>
            <Grid item xs={12}>
              <Paper className={classes.paper} elevation={1} square>
                <Grid container>
                  <Grid item xs={4}>
                    <Typography color="inherit" component="h1">
                      {user.surname}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography color="inherit" component="h1">
                      {user.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography color="inherit" component="p">
                      Роль: {user.role}{" "}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
}
