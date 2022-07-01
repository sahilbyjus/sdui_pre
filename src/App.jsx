import React from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import routes from './routes';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-bar">
        <CssBaseline />
        <AppBar>
          <Toolbar>
            <Typography variant="h6" noWrap>
              SDUI
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <Routes>
        {routes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              element={<route.component />}
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
