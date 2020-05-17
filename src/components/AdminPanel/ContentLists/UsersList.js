import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
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

export default function UsersList(props) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.adminReducer.content);
  return (
    <div>
      {users.map((user, index) => {
        return (
          <Grid container key={index}>
            <Grid item xs={12}>
              <Paper className={classes.paper} elevation={1} square>
                <Grid container>
                  <Grid item xs={2}>
                    <Typography color="inherit" component="h1">
                      {user.surname}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography color="inherit" component="h1">
                      {user.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    {user.middlename && (
                      <Typography color="inherit" component="h1">
                        {user.middlename}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={2}>
                    {user.nameRole === "ROLE_STUDENT" && (
                      <Typography color="inherit" component="h1">
                        {user.numberGroup}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={2}>
                    <SingleContentContainer id={user.userId} />
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      color="secondary"
                      variant="outlined"
                      onClick={() =>
                        dispatch(
                          deleteOneContent(
                            user.userId,
                            history.location.pathname
                          )
                        )
                      }
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
