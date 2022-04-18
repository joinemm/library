import React from 'react';
import { version } from 'react';
import { createTheme, ThemeProvider, Container, Box, CssBaseline, Icon } from '@mui/material';
import MainInterface from './components/MainInterface';
import MenuBook from '@mui/icons-material/MenuBook';

console.log('Running react ' + version);

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container component="main" fixed>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box sx={{ flexGrow: 1, width: 650 }}>
            <Box sx={{ width: '100%', textAlign: 'center', marginBottom: 4 }}>
              <Icon>
                <MenuBook></MenuBook>
              </Icon>
            </Box>
            <MainInterface></MainInterface>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
