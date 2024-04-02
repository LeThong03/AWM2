import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes component

import { Footer, Header, Wim, Features, Blog } from './containers';
import { CTA, Navbar } from './components';
import { Login, Register, Error404, RegisterSuccess, Student } from './pages/';

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
    <Register/>
    </div>
  );
};

const RegisterSuccessPage = () => {
  return (
    <div>
    <RegisterSuccess/>
    </div>
  );
};

const StudentLoginPage = () => {
  return (
    <div>
          <Student/>
   </div>
  );
};



const NoPage = () => {
  return (
    <div className='gradient_bg'>
    <Error404/>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<RegisterPage />} />
        <Route path='/signupsuccess' element={<RegisterSuccessPage />} />
        <Route path='/StudentPage' element={<StudentLoginPage />} />
        <Route path='*' element={<NoPage />} />
      </Routes>
    </Router>
  );
};

export default App;
