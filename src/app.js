import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes component

import { Footer, Header, Wim, Features, Blog } from './containters';
import { CTA, Navbar } from './components';


import './app.css';

const Home = () => {
  return (
    <div className='gradient_bg'>
      <Navbar />
      <Header />
      <Wim />
      <Features />
      <CTA />
      <Blog />
      <Footer />
    </div>
  );
};

const Login = () => {
  return (
<div className='gradient_bg'>

    </div>
  );
};

const Register = () => {
  return (
    <div>

    </div>
  );
};

const NoPage = () => {
  return (
    <div>

    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path='*' element={<NoPage />} />
      </Routes>
    </Router>
  );
};

export default App;
