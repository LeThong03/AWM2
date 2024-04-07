import React from 'react';
import './student.css';
import SideMenu from './sideMenu/SideMenu';

const Student = () => {
  return (
    <div className="student-container">
      <SideMenu />
      <div className="main-content">
        
      </div>
    </div>
  );
};

export default Student;

/*
Create a database for magazines
Magazine Title:
Magazine  Author:
Magazine Publication Date:
Magazine Status: ( Published/Unpublished/Community Publish)
Magazine  Photo:
Magazine PDF file:
Magazine Comment:

Also a database for this storing Magazines Faculties , each Faculty can store many Magazines 
Faculty of Engineering:
Faculty of Medicine:
Faculty of Arts and Humanities: 
Faculty of Business and Economics: 
*/