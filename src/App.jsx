import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Outlet } from 'react-router-dom';
import Nav from './ui/Nav';

function App() {
  return (
    <div>
      <Nav />
      <h1>Welcome to the Online Computer Store</h1>
      <Outlet />
    </div>
  );
}

export default App;
