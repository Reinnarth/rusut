import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import NativeSelect from "@material-ui/core/NativeSelect";
import Toolbar from "@material-ui/core/Toolbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import RefreshIcon from "@material-ui/icons/Refresh";

import PaginationControlled from "../Shared/Pagination/Pagination";
import UploadFileForm from "../Shared/UploadFileForm/UploadFileForm";
import SinglePracticePlace from "./SingleContent/SinglePracticePlace";
import { ContentSwitch } from "./ContentLists/ContentSwitch";

const styles = (theme) => ({
  paper: {
    maxWidth: 936,
    margin: "auto",
    overflow: "hidden",
  },
  practiceConstr: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: "auto",
    maxHeight: "20em",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modal: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(8),
  },
  searchBar: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: "block",
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

function Content(props) {
  const { classes, loading } = props;
  const [params, setParams] = useState({ offset: 0 });
  const [open, setOpen] = useState(false);

  let history = useHistory();
  const tab = useSelector((state) => state.adminReducer.tab);
  const classifiers = useSelector((state) => state.adminReducer.classifiers);

  useEffect(() => {
    const fetchData = async () => {
      await props.getContentArray(history.location.pathname, params);
      await props.getClassifiers();
    };
    fetchData();
  }, [history.location.pathname]);

  const handleChange = (event) => {
    if (event.target.value === "") {
      let newParams = params;
      delete newParams[event.target.name];
      setParams(newParams);
    } else {
      setParams({ ...params, [event.target.name]: event.target.value });
    }
  };

  const handleSearchForm = (e) => {
    e.preventDefault();
    props.getContentArray(`admin/${tab}`, params);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseButForPractice = () => {
    setOpen(false);
  };

  return (
    <Paper className={classes.paper} square>
      <AppBar
        className={classes.searchBar}
        position="static"
        color="default"
        elevation={1}
      >
        <Toolbar>
          <form onSubmit={handleSearchForm}>
            <Grid container direction="row">
              <Grid item>
                <SearchIcon className={classes.block} color="inherit" />
              </Grid>

              <Grid item xs>
                <TextField
                  fullWidth
                  placeholder="Поиск"
                  onChange={handleChange}
                  InputProps={{
                    name: "search",
                    disableUnderline: true,
                    className: classes.searchInput,
                  }}
                />
              </Grid>
              <Grid item>
                <Tooltip title="Найти">
                  <IconButton type="submit">
                    <SearchIcon className={classes.block} color="inherit" />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Обновить">
                  <IconButton
                    onClick={() => {
                      props.getContentArray(`admin/${tab}`, { offset: 0 });
                    }}
                  >
                    <RefreshIcon className={classes.block} color="inherit" />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>

            {tab === "place_practice" && (
              <Grid item xs>
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={() => setOpen(true)}
                >
                  Добавить
                </Button>
              </Grid>
            )}

            {tab === "teachers" && (
              <Grid item xs>
                <NativeSelect
                  value={params.position}
                  onChange={handleChange}
                  inputProps={{
                    name: "namePosition",
                  }}
                >
                  {classifiers.positions.map((el, index) => (
                    <option key={index} value={el}>
                      {el}
                    </option>
                  ))}
                </NativeSelect>{" "}
              </Grid>
            )}

            {tab === "students" && (
              <Grid item xs>
                <NativeSelect
                  value={params.specialty}
                  onChange={handleChange}
                  inputProps={{
                    name: "specialty",
                  }}
                >
                  <option value=""></option>
                  {classifiers.specialty.map((el, index) => (
                    <option key={index} value={el.nameSpecialty}>
                      {el.nameSpecialty}
                    </option>
                  ))}
                </NativeSelect>
              </Grid>
            )}
          </form>
        </Toolbar>
      </AppBar>
      <div className={classes.contentWrapper}>
        {/* {loading && <CircularProgress />} */}

        {/* {!loading && <></>} */}
        {tab === "library" && (
          <Dialog
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <UploadFileForm
                setOpen={setOpen}
                uploadFile={props.uploadFile}
              ></UploadFileForm>
            </Fade>
          </Dialog>
        )}
        {tab === "place_practice" && (
          <Dialog
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleCloseButForPractice}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={classes.practiceConstr}>
                <SinglePracticePlace
                  handleClose={handleCloseButForPractice}
                  tab={tab}
                  editFlag={true}
                  classifiers={classifiers}
                  updateContent={props.addPlace}
                />
              </div>
            </Fade>
          </Dialog>
        )}

        <ContentSwitch />
      </div>
      <div className={classes.paginationWrapper}>
        <PaginationControlled
          tab={tab}
          params={params}
          setParams={setParams}
          getContentArray={props.getContentArray}
          pagecount={Math.ceil(props.amount / 25)}
        />
      </div>
    </Paper>
  );
}

export default withStyles(styles)(Content);
