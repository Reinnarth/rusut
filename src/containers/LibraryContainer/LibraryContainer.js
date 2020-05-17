import { connect } from "react-redux";

import LibraryPage from "../../components/pages/LibraryPage";

import {
  getBooks,
  getBook,
  uploadBook,
  downloadFile,
} from "../../store/library/libraryActions";

const mapStateToProps = (state) => ({
  loading: state.viewReducer.loading,
  user: state.userReducer.user,
  books: state.libraryReducer.books,
  book: state.libraryReducer.book,
});

const mapDispatchToProps = (dispatch) => ({
  getBook: (params, id, callback) => dispatch(getBook(params, id, callback)),
  getBooks: (params) => dispatch(getBooks(params)),
  uploadBook: (file, specialty, path) =>
    dispatch(uploadBook(file, specialty, path)),
  downloadFile: (id) => dispatch(downloadFile(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LibraryPage);
