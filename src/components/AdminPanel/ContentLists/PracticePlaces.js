import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import SingleContentContainer from "../../../containers/AdminContainer/SingleContentContainer";

import { deleteOneContent } from "../../../store/admin/adminActions";

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

export default function PracticePlaces(props) {
  const classes = useStyles();
  const history = useHistory();
  const places = useSelector((state) => state.adminReducer.content);
  const dispatch = useDispatch();

  return (
    <div>
      {places.map((place, index) => {
        return (
          <Grid container key={index}>
            <Grid item xs={12}>
              <Paper className={classes.paper} elevation={1} square>
                <Grid container>
                  <Grid item xs={4}>
                    <Typography color="inherit" component="h1">
                      {place.companyName}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography color="inherit" component="h1">
                      {place.address}
                    </Typography>
                  </Grid>

                  <Grid item xs={2}>
                    <SingleContentContainer id={place.placePracticeId} />
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
                              place.placePracticeId,
                              history.location.pathname,
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
