import logo from './logo.svg';
import React from 'react';
import { useState, version } from 'react';
import './App.css';
import {
  createTheme,
  Box,
  ThemeProvider,
  TextField,
  Button,
  Stack,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BookIcon from '@mui/icons-material/Book';

console.log('Running react ' + version);
const api_endpoint = process.env.BACKEND_PATH || '';
fetch(api_endpoint + '/ping').then((response) => {
  console.log(response.statusText);
});
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [data, setData] = useState([
    { id: 0, author: 'Tom Hanks', title: 'cool book', description: 'its full of secrets' },
    { id: 1, author: 'Margot', title: 'not so cool booklet', description: 'its not very cool' },
    { id: 2, author: 'Margot2', title: 'not2 so cool booklet', description: 'its2 not very cool' },
    { id: 3, author: 'Margot3', title: 'not3 so cool booklet', description: 'its3 not very cool' },
  ]);

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [formTitle, setFormTitle] = useState('');
  const [formAuthor, setFormAuthor] = useState('');
  const [formDescription, setFormDescription] = useState('');

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    const selectedObject = data.find((x) => x.id === index);
    if (selectedObject !== undefined) {
      setFormTitle(selectedObject.title);
      setFormAuthor(selectedObject.author);
      setFormDescription(selectedObject.description);
    }
  };

  const clearForm = () => {
    setFormTitle('');
    setFormAuthor('');
    setFormDescription('');
    setSelectedIndex(null);
  };

  const saveNewBook = () => {
    setData((oldData) => [
      ...oldData,
      {
        id: oldData.length,
        author: formAuthor,
        title: formTitle,
        description: formDescription,
      },
    ]);
    clearForm();
  };

  const editBook = () => {
    setData(
      data.map((book) =>
        book.id === selectedIndex
          ? { ...book, author: formAuthor, title: formTitle, description: formDescription }
          : book,
      ),
    );
  };

  const deleteBook = () => {
    setData(data.filter((book) => book.id !== selectedIndex));
    clearForm();
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Box sx={{ flexGrow: 1 }}>
            <Stack spacing={2} direction="row">
              <Stack spacing={2}>
                <TextField
                  id="title"
                  label="Title"
                  onChange={(event) => setFormTitle(event.target.value)}
                  value={formTitle}
                />
                <TextField
                  id="author"
                  label="Author"
                  onChange={(event) => setFormAuthor(event.target.value)}
                  value={formAuthor}
                />
                <TextField
                  id="description"
                  minRows={4}
                  label="Description"
                  variant="outlined"
                  onChange={(event) => setFormDescription(event.target.value)}
                  value={formDescription}
                  multiline
                  fullWidth
                />
                <Stack spacing={2} direction="row">
                  <Button variant="outlined" onClick={saveNewBook}>
                    Save new
                  </Button>
                  <Button variant="outlined" onClick={editBook}>
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={deleteBook}
                  >
                    Delete
                  </Button>
                </Stack>
              </Stack>
              <Stack spacing={2}>
                <List>
                  {data.map((book) => {
                    return (
                      <ListItemButton
                        selected={selectedIndex === book.id}
                        onClick={(event) => handleListItemClick(event, book.id)}
                        key={book.id}
                      >
                        <ListItemIcon>
                          <BookIcon />
                        </ListItemIcon>
                        <ListItemText primary={book.title} secondary={book.author} />
                      </ListItemButton>
                    );
                  })}
                </List>
              </Stack>
            </Stack>
          </Box>
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
