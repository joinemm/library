import { Stack, Collapse, Skeleton } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import Book from './Book';

const BookList = (props) => {
  return (
    <>
      {props.bookList.length > 0 ? (
        <Stack spacing={2}>
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
        </Stack>
      ) : (
        <Skeleton height={91} sx={{ transform: 'none' }}></Skeleton>
      )}
    </>
  );
};

export default BookList;
