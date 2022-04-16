import { Stack, Collapse } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import Book from './Book';

const BookList = (props) => {
  return (
    <Stack spacing={2}>
      {props.bookList.length > 0 ? (
        <TransitionGroup>
          {props.bookList.map((book, i) => {
            return (
              <Collapse key={book.id}>
                <Book
                  book={book}
                  clickEvent={props.listItemClickHandler}
                  selected={props.currentSelection === book.id}
                ></Book>
              </Collapse>
            );
          })}
        </TransitionGroup>
      ) : (
        <p>Start by adding some books</p>
      )}
    </Stack>
  );
};

export default BookList;
