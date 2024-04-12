import React, { Component } from 'react';
import axios from 'axios';
import './register.css';
import SideMenu from '../sideMenu/SideMenu';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    try {
      const response = await axios.get('/getAllUsers'); // Fetch data from '/getAllUsers' endpoint
      this.setState({ users: response.data });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  render() {
    const { users } = this.state;

    return (
      <div className="user-table-container">
        <SideMenu />
        <h2>User Management</h2>
        <table className="user-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Faculty</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.faculty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Register;
