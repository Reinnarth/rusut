import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Typography,
  Button,
  Paper,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import lodash from "lodash";

import { addStg, deleteStg, getStg } from "../../store/stg/stgActions";
import StgForm from "./StgAux/StgForm";

const styles = (theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  paper: {
    maxWidth: "80%",
    margin: "auto",
    overflow: "hidden",
    backgroundColor: "#f7f7f7",
  },
  groups: {
    marginTop: theme.spacing(2),

    marginLeft: theme.spacing(1),
  },
  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: "40px 16px",
    textAlign: "center",
  },
  paginationWrapper: {
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
  },
});

function StgPage(props) {
  const { classes } = props;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const classifiers = useSelector((state) => state.userReducer.classifiers);
  const loading = useSelector((state) => state.viewReducer.loading);

  const postSTG = (stg) => {
    dispatch(addStg(stg, user.userId));
  };

  const deleteSTG = (stg, event) => {
    dispatch(deleteStg(stg, user.userId));
  };

  return (
    <Grid container spacing={2}>
      {loading && <></>}
      {!loading && (
        <>
          <Grid className={classes.container} item xs={6}>
            <Paper className={classes.paper} square>
              <StgForm
                classifiers={classifiers}
                user={user}
                postSTG={postSTG}
              />
            </Paper>
          </Grid>

          <Grid className={classes.container} item xs={6}>
            <Paper className={classes.paper} square>
              {user.stg.map((el, index) => (
                <Grid item xs={12} className={classes.groups} key={index}>
                  <Typography>{el.subject}</Typography>
                  <nobr>
                    <Typography component="span">Группы: </Typography>
                    {el.groups.map((group, index) => (
                      <Typography
                        component="span"
                        key={index}
                      >{` ${group}`}</Typography>
                    ))}
                  </nobr>
                  <div>
                    <Typography component="span">Семестры: </Typography>
                    {el.semesters.map((semester) => (
                      <Typography component="span" key={index}>{` ${semester}`}</Typography>
                    ))}
                  </div>
                  <Button
                    color="secondary"
                    variant="outlined"
                    onClick={(event) => deleteSTG(el, event)}
                  >
                    Удалить связь
                  </Button>
                </Grid>
              ))}
            </Paper>
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default withStyles(styles)(StgPage);
