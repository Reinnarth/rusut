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

    props.getContentArray(`admin/${props.tab}`, {
      ...props.params,
      offset: (value - 1) * 25,
    });
  };

  return (
    <div className={classes.root}>
      <Typography>Page: {page}</Typography>
      <Pagination count={props.pagecount} page={page} onChange={handleChange} />
    </div>
  );
}
