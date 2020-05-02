import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import SingleSwitch from "../SingleContent/SingleSwitch";

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

export default function BooksList(props) {
  const classes = useStyles();
  const books = useSelector((state) => state.adminReducer.content);
  return (
    <div>
      {books.map((book) => {
        return (
          <Grid container>
            <Grid item xs={12}>
              <Paper className={classes.paper} elevation={1} square>
                <Grid container>
                  <Grid item xs={4}>
                    <Typography color="inherit" component="h1">
                      {book.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography color="inherit" component="h1">
                      {book.author}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <SingleSwitch />
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
