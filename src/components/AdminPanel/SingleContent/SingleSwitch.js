import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";

import SingleUser from "./SingleUser";
import SingleBook from "./SingleBook";
import SinglePracticePlace from "./SinglePracticePlace";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SingleSwitch(props) {
  const classes = useStyles();
  let history = useHistory();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    props.getOneContent(props.id, history.location.pathname);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const switcher = () => {
    switch (history.location.pathname) {
      case "/admin/users":
        return (
          <>
            {props.loading && <CircularProgress />}
            {!props.loading && (
              <SingleUser
                location={props.location}
                key={props.id}
                user={props.oneContent}
                tab={props.tab}
                classifiers={props.classifiers}
                updateContent={props.updateContent}
                handleClose={handleClose}
                getContentArray={props.getContentArray}
                getOneContent={props.getOneContent}
                deleteOneContent={props.deleteOneContent}
              />
            )}
          </>
        );
      case "/admin/library":
        return (
          <SingleBook
            key={props.id}
            book={props.oneContent}
            tab={props.tab}
            classifiers={props.classifiers}
            updateContent={props.updateContent}
            getContentArray={props.getContentArray}
            downloadFile={props.downloadFile}
          />
        );
      case "/admin/place_practice":
        return (
          <SinglePracticePlace
            key={props.id}
            place={props.oneContent}
            tab={props.tab}
            classifiers={props.classifiers}
            updateContent={props.updateContent}
            getContentArray={props.getContentArray}
            handleClose={handleClose}
            downloadFile={props.downloadFile}
          />
        );
      //   case "/admin/learning-activities":
      //     return <ActivitiesList />;
      default:
        return <div>Nothing found</div>;
    }
  };

  return (
    <div>
      <Button
        type="button"
        variant="outlined"
        color="primary"
        onClick={handleOpen}
      >
        Открыть
      </Button>
      <Modal
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
          <div className={classes.paper}>{switcher()}</div>
        </Fade>
      </Modal>
    </div>
  );
}
