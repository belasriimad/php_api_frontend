import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from "./components/Layouts/Header";
import Home from "./components/pages/Home";
import Register from './components/pages/user/Register';
import Login from './components/pages/user/Login';
import { ToastContainer } from 'react-toastify';

export const AuthContext = React.createContext(null);


function App() {
  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem("user")));
  
  return (
    <AuthContext.Provider value={{loggedInUser, setLoggedInUser}}>
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App;
