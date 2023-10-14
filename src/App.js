import React from 'react'
import Home from './Components/Home/Home'
import { Provider } from 'react-redux';
import Store from './Components/redux/store/store';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';





const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

const App = () => {


  return (
    <ThemeProvider theme={theme}>

      <Provider store={Store}>

        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>

      </Provider>
    </ThemeProvider>
  )
}

export default App
