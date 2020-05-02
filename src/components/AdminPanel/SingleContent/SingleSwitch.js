import React from "react";
import {useHistory} from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";

import SingleUser from "./SingleUser";
import { getUser } from "../../../store/admin/adminActions";

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
    props.getUser(props.userId);
    props.getClassifiers();
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
                key={props.userId}
                user={props.user}
                tab={props.tab}
                classifiers={props.classifiers}
                updateUser={props.updateUser}
                getContentArray={props.getContentArray}
              />
            )}
          </>
        );
      //   case "/admin/library":
      //     return <BooksList />;
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
        Open
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
