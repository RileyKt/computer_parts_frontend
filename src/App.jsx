import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './ui/Nav';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <Nav isLoggedIn={isLoggedIn} />
      <h1>Welcome to the Online Computer Store</h1>
      <Outlet context={{ isLoggedIn, setIsLoggedIn }} />
    </div>
  );
}
