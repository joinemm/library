import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Grid } from '@mui/material';
import BookList from './BookList';
import BookForm from './BookForm';

class MainInterface extends Component {
  constructor() {
    super();
    this.state = {
      bookList: [],
      selectedBookId: null,
      formTitle: '',
      formAuthor: '',
      formDescription: '',
    };
    this.handleListItemClick = this.handleListItemClick.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.saveNewBook = this.saveNewBook.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
    this.editBook = this.editBook.bind(this);

    this.state.bookList = [
      { id: uuidv4(), author: 'Tom Hanks', title: 'cool book', description: 'its full of secrets' },
      {
        id: uuidv4(),
        author: 'Margot',
        title: 'not so cool booklet',
        description: 'its not very cool',
      },
      {
        id: uuidv4(),
        author: 'Margot2',
        title: 'not2 so cool booklet',
        description: 'its2 not very cool',
      },
      {
        id: uuidv4(),
        author: 'Margot3',
        title: 'not3 so cool booklet',
        description: 'its3 not very cool',
      },
    ];
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

  saveNewBook() {
    this.setState(function (prevState) {
      return {
        bookList: [
          ...prevState.bookList,
          {
            id: uuidv4(),
            author: prevState.formAuthor,
            title: prevState.formTitle,
            description: prevState.formDescription,
          },
        ],
      };
    });
    this.clearForm();
  }

  editBook() {
    this.setState(function (prevState) {
      return {
        bookList: prevState.bookList.map((book) =>
          book.id === prevState.selectedBookId
            ? {
                ...book,
                author: prevState.formAuthor,
                title: prevState.formTitle,
                description: prevState.formDescription,
              }
            : book,
        ),
      };
    });
  }

  deleteBook() {
    this.setState(function (prevState) {
      return {
        bookList: prevState.bookList.filter((book) => book.id !== prevState.selectedBookId),
      };
    });
    this.clearForm();
  }

  render() {
    return (
      <Grid container spacing={2} columns={2}>
        <Grid item xs={1}>
          <BookForm
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
          <BookList
            bookList={this.state.bookList}
            listItemClickHandler={this.handleListItemClick}
            currentSelection={this.state.selectedBookId}
          ></BookList>
        </Grid>
      </Grid>
    );
  }
}

export default MainInterface;
