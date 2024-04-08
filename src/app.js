import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes component
import { Login, Register, Error404, RegisterSuccess, Home, Magazines } from './pages/';

import Dashboard from './pages/users/student/dashBoard/DashBoard';
import SubmissionForm from './pages/users/student/submissionForm/SubmissionForm';
import Status from './pages/users/student/status/Status';
import Settings from './pages/users/student/settings/StudentSettings';

import DashBoard from './pages/users/manager/dashBoard/DashBoard';

import './app.css';

const HomePage = () => {
  return (
    <div className='gradient_bg'>
    <Home/>
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

const ibrary = () => {
  return (
    <div>
    <Magazines/>
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
        <Route path="/login" element={<Login />} />
        <Route path="/library" element={<Magazines />} />

        <Route path="/Student/dashboard" element={<Dashboard />} />
        <Route path="/Student/submit-magazine" element={<SubmissionForm />} />
        <Route path="/Student/check-publish-status" element={<Status />} />
        <Route path="/Student/settings" element={<Settings />} />

        <Route path="/Manager/dashboard" element={<Dashboard />} />
        <Route path="/Manager/settings" element={<Settings />} />
        
        <Route path="/Admin/dashboard" element={<Dashboard />} />
        <Route path="/Admin/settings" element={<Settings />} />
        
        <Route path="/Coordinator/dashboard" element={<Dashboard />} />
        <Route path="/Coordinator/submit-magazine" element={<SubmissionForm />} />
        <Route path="/Coordinator/check-publish-status" element={<Status />} />
        <Route path="/Coordinator/settings" element={<Settings />} />

        <Route path='*' element={<NoPage />} />
      </Routes>
    </Router>
  );
};

export default App;
