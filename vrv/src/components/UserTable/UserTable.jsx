import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import ModalForm from '../ModalForm/ModalForm';  // Import ModalForm

const UserTable = ({ users, roles, onAdd, onEdit, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    status: 'Active',
  });

  // Reset form when modal is closed
  const handleClose = () => {
    setShowModal(false);
    setEditingUser(null);
    setFormData({ name: '', email: '', role: '', status: 'Active' });
  };

  // Open modal for add or edit action
  const handleShow = (user = null) => {
    setEditingUser(user);
    setFormData(user || { name: '', email: '', role: '', status: 'Active' });
    setShowModal(true);
  };

  // Handle form submission for add or edit
  const handleSubmit = (data) => {
    // Perform simple validation
    if (!data.name.trim()) {
      alert('Name is required');
      return;
    }
    if (!data.email.trim()) {
      alert('Email is required');
      return;
    }

    if (editingUser) {
      // If editing, call onEdit and pass updated user data
      onEdit({ ...editingUser, ...data });
    } else {
      // If adding, call onAdd and pass new user data
      onAdd({ ...data, id: Date.now() });  // Example: Generating a unique ID for new users
    }

    // Close modal after submission
    handleClose();
  };

  const modalFields = [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'role', label: 'Role', type: 'select', options: roles },
    { name: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive'] }
  ];

  return (
    <>
      <Button variant="primary" onClick={() => handleShow()}>
        Add User
      </Button>
      <Table striped bordered hover className="mt-3">
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
          {users.map((user) => (
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
                  onClick={() => onDelete(user.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

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

export default UserTable;
