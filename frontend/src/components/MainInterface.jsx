import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Grid, Snackbar, Alert, ClickAwayListener } from '@mui/material';
import BookList from './BookList';
import BookForm from './BookForm';
import axios from 'axios';

const API_ENDPOINT = process.env.BACKEND_PATH || '';
class MainInterface extends Component {
  constructor() {
    super();
    this.state = {
      bookList: [],
      selectedBookId: null,
      formTitle: '',
      formAuthor: '',
      formDescription: '',
      snackbar: {
        open: false,
        severity: 'error',
        message: 'Nothing yet!',
      },
    };
    this.handleListItemClick = this.handleListItemClick.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.saveNewBook = this.saveNewBook.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
    this.editBook = this.editBook.bind(this);
    this.updateBooks = this.updateBooks.bind(this);
    this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
  }

  async componentDidMount() {
    await this.updateBooks();
  }

  async updateBooks() {
    await axios
      .get(API_ENDPOINT + '/book/list')
      .then((response) => {
        this.setState({
          bookList: response.data,
        });
      })
      .catch((error) => {
        this.setState({ snackbar: { open: true, message: error.message, severity: 'error' } });
      });
  }

  handleListItemClick(event, id) {
    this.setState({ selectedBookId: id });
    const selectedObject = this.state.bookList.find((x) => x.id === id);
    if (selectedObject !== undefined) {
      this.setState({
        formTitle: selectedObject.title,
        formAuthor: selectedObject.author,
        formDescription: selectedObject.description,
      });
    }
  }

  clearForm() {
    this.setState({
      selectedBookId: null,
      formTitle: '',
      formAuthor: '',
      formDescription: '',
    });
  }

  bookApiPostRequest(path, params, successMessage, shouldClearForm) {
    axios
      .post(API_ENDPOINT + path, new URLSearchParams(params))
      .then(async () => {
        this.setState({
          snackbar: { open: true, message: successMessage, severity: 'success' },
        });
        await this.updateBooks();
        shouldClearForm && this.clearForm();
      })
      .catch((error) => {
        this.setState({ snackbar: { open: true, message: error.message, severity: 'error' } });
      });
  }

  saveNewBook() {
    this.bookApiPostRequest(
      '/book/add',
      {
        id: uuidv4(),
        title: this.state.formTitle,
        author: this.state.formAuthor,
        description: this.state.formDescription,
      },
      'Added a new book',
      true,
    );
  }

  editBook() {
    this.bookApiPostRequest(
      '/book/edit',
      {
        id: this.state.selectedBookId,
        title: this.state.formTitle,
        author: this.state.formAuthor,
        description: this.state.formDescription,
      },
      'Saved changes to the selected book',
      false,
    );
  }

  deleteBook() {
    this.bookApiPostRequest(
      '/book/delete',
      {
        id: this.state.selectedBookId,
      },
      'Deleted the selected book',
      true,
    );
  }

  handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState(function (prevState) {
      return {
        snackbar: {
          open: false,
          severity: prevState.snackbar.severity,
          message: prevState.snackbar.message,
        },
      };
    });
  };

  render() {
    return (
      <ClickAwayListener onClickAway={this.clearForm}>
        <Grid container spacing={2} columns={2}>
          <Snackbar
            open={this.state.snackbar.open}
            autoHideDuration={6000}
            onClose={this.handleSnackbarClose}
            anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
          >
            <Alert
              variant="filled"
              onClose={this.handleSnackbarClose}
              severity={this.state.snackbar.severity}
              sx={{ width: '100%' }}
            >
              {this.state.snackbar.message}
            </Alert>
          </Snackbar>
          <Grid item xs={1}>
            <BookForm
              bookIsSelected={this.state.selectedBookId != null}
              titleState={this.state.formTitle}
              onTitleChange={(e) => this.setState({ formTitle: e.target.value })}
              authorState={this.state.formAuthor}
              onAuthorChange={(e) => this.setState({ formAuthor: e.target.value })}
              descriptionState={this.state.formDescription}
              onDescriptionChange={(e) => this.setState({ formDescription: e.target.value })}
              onSaveNew={this.saveNewBook}
              onSave={this.editBook}
              onDelete={this.deleteBook}
            ></BookForm>
          </Grid>
          <Grid item xs={1}>
            {this.state.bookList == null ? (
              <Alert severity="error">There was an error fetching the book list</Alert>
            ) : (
              <BookList
                bookList={this.state.bookList}
                listItemClickHandler={this.handleListItemClick}
                currentSelection={this.state.selectedBookId}
              ></BookList>
            )}
          </Grid>
        </Grid>
      </ClickAwayListener>
    );
  }
}

export default MainInterface;
