import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function PaginationControlled(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(1);

  const handleChange = async (event, value) => {
    setPage(value);

    if (props.tab) {
      props.getContentArray(`admin/${props.tab}`, {
        ...props.params,
        offset: (value - 1) * 25,
      });
    } else {
      props.getContentArray({
        ...props.params,
        offset: (value - 1) * 25,
      });
    }
  };

  return (
    <div className={classes.root}>
      <Typography>Страница: {page}</Typography>
      <Pagination
        showFirstButton
        showLastButton
        count={props.pagecount}
        page={page}
        onChange={handleChange}
      />
    </div>
  );
}
