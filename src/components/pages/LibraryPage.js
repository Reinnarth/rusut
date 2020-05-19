import React, { useState, useEffect } from "react";

import {
  IconButton,
  Button,
  DialogContent,
  TextField,
  Grid,
  Dialog,
  Tooltip,
  Select,
  AppBar,
  Toolbar,
  CircularProgress,
  Typography,
  Paper,
  Backdrop,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import { withStyles } from "@material-ui/core/styles";
import Can from "../Can";
import ExamContainer from "../../containers/ExamContainer/ExamContainer";
import PaginationControlled from "../Shared/Pagination/Pagination";
import UploadFileForm from "../Shared/UploadFileForm/UploadFileForm";

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    maxWidth: 936,
    margin: "auto",
    overflow: "hidden",
  },
  modal: {
    margin: theme.spacing(16),
    position: "absolute",
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

function LibraryPage(props) {
  const {
    loading,
    classes,
    books,
    classifiers,
    user,
    getBooks,
    downloadFile,
  } = props;

  const [params, setParams] = useState({ offset: 0 });
  const [open, setOpen] = useState(false);
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    console.log("hehe");
    getBooks(params);
  }, []);

  useEffect(() => {
    setBookList(books.content);
  }, [books]);

  if (!loading) {
    const list = bookList.map((book, index) => {
      return (
        <Grid container key={index}>
          <Grid item xs={12}>
            <Grid container className={classes.contentWrapper}>
              <Grid item xs={5}>
                <Typography component="h1">{book.name}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography component="h1">{book.subject}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Button
                  color="primary"
                  variant="outlined"
                  // onClick={() => setOpen(true)}
                >
                  Подробнее
                </Button>
              </Grid>
              <Grid item xs={2}>
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={() => downloadFile(book.libraryId)}
                >
                  Скачать
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      );
    });

    return (
      <Paper className={classes.paper} square>
        <AppBar
          className={classes.searchBar}
          position="static"
          color="default"
          elevation={0}
        >
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <SearchIcon className={classes.block} color="inherit" />
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  placeholder="Search by name"
                  onChange={(event) => {
                    setParams({
                      ...params,
                      [event.target.name]: event.target.value,
                    });
                  }}
                  InputProps={{
                    name: "search",
                    disableUnderline: true,
                    className: classes.searchInput,
                  }}
                />
              </Grid>
              <Tooltip title="Найти">
                <IconButton
                  onClick={() => {
                    getBooks(params);
                  }}
                >
                  <SearchIcon className={classes.block} color="inherit" />
                </IconButton>
              </Tooltip>
              <Grid item xs>
                <Can
                  role={user.nameRole}
                  perform="library:add"
                  yes={(props) => (
                    <Button
                      color="primary"
                      variant="outlined"
                      onClick={() => setOpen(true)}
                    >
                      Загрузить книгу
                    </Button>
                  )}
                  no={() => <></>}
                />
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <div className={classes.contentWrapper}>
          <Dialog
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={() => setOpen(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <DialogContent>
              <UploadFileForm
                setOpen={setOpen}
                uploadFile={props.uploadBook}
                classifiers={classifiers}
              ></UploadFileForm>
            </DialogContent>
          </Dialog>
          {/* {loading && <CircularProgress />} */}

          {/* {!loading && <></>} */}

          <>{list}</>
        </div>
        <div className={classes.paginationWrapper}>
          <PaginationControlled
            params={params}
            setParams={setParams}
            getContentArray={getBooks}
            pagecount={Math.ceil(props.amount / 25)}
          />
        </div>
      </Paper>
    );
  } else {
    return (
      <Grid container>
        <CircularProgress></CircularProgress>
      </Grid>
    );
  }
}
//   return (
//     <div>
//       <Can
//         role={user.nameRole}
//         perform="library:add"
//         yes={(props) => <ExamContainer {...props} />}
//         no={() => <StudentView></StudentView>}
//       />
//     </div>
//   );
// }
export default withStyles(styles)(LibraryPage);
