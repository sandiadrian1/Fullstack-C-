/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Parkir from './pages/Parkir';
import TypeTransportasiCrud from './pages/TypeTransportasiCrud';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
        <main>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/parkir" element={<Parkir />} />
        <Route path="/typeTransportasiCrud" element={<TypeTransportasiCrud/>} />
      </Routes>
       <Footer/>
      </main>
    </Router>
  );
};

export default App;
