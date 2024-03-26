import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes component

import { Footer, Header, Wim, Features, Blog } from './containters';
import { CTA, Navbar } from './components';
import { Login, Regester} from './logins';

import './app.css';

const HomePage = () => {
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

const LoginPage = () => {
  return (
  <div>
    <Login/>
    </div>
  );
};

const RegisterPage = () => {
  return (
    <div>
    <Regester/>
    </div>
  );
};

const NoPage = () => {
  return (
    <div>
    <Login/>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<RegisterPage />} />
        <Route path='*' element={<NoPage />} />
      </Routes>
    </Router>
  );
};

export default App;