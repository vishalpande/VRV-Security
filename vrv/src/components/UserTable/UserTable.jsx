import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'react-bootstrap';
import ModalForm from '../ModalForm/ModalForm'; // Ensure this is the correct path

const UserTable = ({ roles, onAdd, onEdit, onDelete }) => {
  // State for managing users and modal visibility
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Form data for add/edit modal
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: roles[0] || '', // Default to the first role if available
    status: 'Active',
  });

  // Close modal and reset form data
  const handleClose = () => {
    setShowModal(false);
    setEditingUser(null);
    setFormData({ name: '', email: '', role: roles[0] || '', status: 'Active' });
  };

  // Open modal for adding or editing users
  const handleShow = (user = null) => {
    setEditingUser(user);
    setFormData(user || { name: '', email: '', role: roles[0] || '', status: 'Active' });
    setShowModal(true);
  };

  // Handle form submission for add/edit
  const handleSubmit = (data) => {
    if (!data.name.trim() || !data.email.trim()) {
      alert('Both Name and Email are required.');
      return;
    }

    let updatedUsers;

    if (editingUser) {
      // Update an existing user
      updatedUsers = users.map((user) =>
        user.id === editingUser.id ? { ...user, ...data } : user
      );
      onEdit?.(data); // Trigger onEdit callback if provided
    } else {
      // Add a new user
      if (users.some((u) => u.email === data.email)) {
        alert('A user with this email already exists.');
        return;
      }
      updatedUsers = [...users, { ...data, id: Date.now() }];
      onAdd?.(data); // Trigger onAdd callback if provided
    }

    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    handleClose();
  };

  // Handle user deletion
  const handleDelete = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    onDelete?.(userId); // Trigger onDelete callback if provided
  };

  // Fields for the modal form
  const modalFields = [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'role', label: 'Role', type: 'select', options: roles },
    { name: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive'] },
  ];

  return (
    <>
      <Button variant="primary" onClick={() => handleShow()} className="mb-3">
        Add User
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.status}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleShow(user)}
                  >
                    Edit
                  </Button>{' '}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No users available. Add a new user to get started.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* ModalForm for Add/Edit */}
      <ModalForm
        title={editingUser ? 'Edit User' : 'Add User'}
        show={showModal}
        onClose={handleClose}
        onSubmit={handleSubmit}
        fields={modalFields}
        initialData={formData}
      />
    </>
  );
};

// Prop Types for validation
UserTable.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAdd: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

// Default Props
UserTable.defaultProps = {
  onAdd: () => {},
  onEdit: () => {},
  onDelete: () => {},
};

export default UserTable;
