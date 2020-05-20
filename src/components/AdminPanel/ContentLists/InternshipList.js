import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SingleSwitch from "../SingleContent/SingleSwitch";

import {
  downloadFile,
  deleteOneContent,
} from "../../../store/admin/adminActions";

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

export default function InternshipList(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const internships = useSelector((state) => state.adminReducer.content);
  console.log("INTERNSHIPS");
  return (
    <div>
      {internships.map((internship) => {
        console.log(internship.id);
        return (
          <Grid container>
            <Grid item xs={12}>
              <Paper className={classes.paper} elevation={1} square>
                <Grid container>
                  <Grid item xs={4}>
                    <Typography color="inherit" component="h1">
                      {internship.topic}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography color="inherit" component="h1">
                      {internship.student}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      type="button"
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        if (window.confirm("Вы уверены?")) {
                          dispatch(
                            deleteOneContent(
                              internship.id,
                              history.location.pathname
                            )
                          );
                        }
                      }}
                    >
                      Удалить
                    </Button>
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
