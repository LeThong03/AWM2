import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes component
import { Login, Register, Error404, RegisterSuccess, Home, Magazines } from './pages/';

/*Student*/
import StudentDashboard from './pages/users/student/dashBoard/DashBoard';
import StudentSubmissionForm from './pages/users/student/submissionForm/SubmissionForm';
import StudentStatus from './pages/users/student/status/Status';

/*Coordinator*/
import CoordinatorDashboard from './pages/users/coordinator/dashBoard/DashBoard';
import CoordinatorViewSubmition from './pages/users/coordinator/viewSubmission/ViewSubmission';
import CoordinatorSubmissionWindow from './pages/users/coordinator/submissionWindow/SubmissionWindow';

/*Manager*/
import ManagerDashboard from './pages/users/manager/dashBoard/DashBoard';
import ManagerViewSubmission from './pages/users/manager/viewSelectedSubmission/ViewSelectedSubmission';

/*Admin*/
import AdminDashboard from './pages/users/admin/dashBoard/DashBoard';
import AdminRegister from './pages/users/admin/register/Register';

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

const Library = () => {
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
        {/*Pages*/}
        <Route path='/' element={<HomePage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<RegisterPage />} />
        <Route path='/signupsuccess' element={<RegisterSuccessPage />} />
        <Route path="/library" element={<Library />} />

        {/*Student*/}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/submit-magazine" element={<StudentSubmissionForm />} />
        <Route path="/student/check-publish-status" element={<StudentStatus />} />
        
        {/*Coordinator*/}
        <Route path="/coordinator/dashboard" element={<CoordinatorDashboard />} />
        <Route path="/coordinator/viewsubmission" element={<CoordinatorViewSubmition />} />
        <Route path="/coordinator/submissionwindow" element={<CoordinatorSubmissionWindow />} />

        {/*Manager*/}
        <Route path="/manager/dashboard" element={<ManagerDashboard/>} />
        <Route path="/manager/viewsubmission" element={<ManagerViewSubmission/>} />


        {/*Admin*/}
        <Route path="/admin/dashboard" element={<AdminDashboard/>} />
        <Route path="/admin/register" element={<AdminRegister/>} />
        
        <Route path='*' element={<NoPage />} />
      </Routes>
    </Router>
  );
};

export default App;
