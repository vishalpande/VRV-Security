import React, { useState } from 'react';
import UserTable from '../../components/UserTable/UserTable';
import ModalForm from '../../components/ModalForm/ModalForm';

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Inactive' },
  ]);

  const [roles, setRoles] = useState(['Admin', 'Editor', 'Viewer']); // Role management state
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Add or Edit user
  const handleAddOrEditUser = (user) => {
    if (editingUser) {
      // Editing an existing user
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === user.id ? { ...u, ...user } : u))
      );
    } else {
      // Adding a new user, ensure no duplicate email
      if (users.some((u) => u.email === user.email)) {
        alert('A user with this email already exists.');
        return;
      }
      setUsers((prevUsers) => [...prevUsers, { ...user, id: Date.now() }]);
    }
  };

  // Delete user
  const handleDeleteUser = (id) => {
    setUsers((prevUsers) => prevUsers.filter((u) => u.id !== id));
  };

  // Add new role
  const handleAddRole = (newRole) => {
    if (!roles.includes(newRole)) {
      setRoles((prevRoles) => [...prevRoles, newRole]);
    } else {
      alert('This role already exists.');
    }
  };

  // Define form fields
  const fields = [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'role', label: 'Role', type: 'select', options: roles },
    { name: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive'] },
  ];

  return (
    <div>
      <h2>User Management</h2>
      <UserTable
        users={users}
        roles={roles} // Pass roles from props
        onAdd={(user) => setUsers((prev) => [...prev, user])}
        onEdit={(user) => setUsers((prev) => prev.map((u) => (u.id === user.id ? user : u)))}
        onDelete={handleDeleteUser}
      
      />
      <ModalForm
        title={editingUser ? 'Edit User' : 'Add User'}
        fields={fields}
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddOrEditUser}
        initialData={editingUser}
      />
    </div>
  );
};

export default UserManagement;
