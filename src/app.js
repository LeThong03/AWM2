import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes component
import { Login, Register, Error404, RegisterSuccess, Student, Home } from './pages/';

import './app.css';

const HomePage = () => {
  return (
    <div className='gradient_bg'>
    <Home/>
    </div>
  );
};
/*
const LoginedHomePage = () => {
  return (
    <div className='gradient_bg'>
      <NavbarLogined/>
    </div>
  );
};
*/
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

/*
const AdminLoginPage = () => {
  return (
  <div>
    </>
    </div>
  );
};

const CordinatorLoginPage = () => {
  return (
  <div>
    </>
    </div>
  );
};
*/

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
