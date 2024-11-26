import React, { useState, useEffect } from 'react';
import UserTable from '../../components/UserTable/UserTable';
import ModalForm from '../../components/ModalForm/ModalForm';

const UserManagement = () => {
  // Initialize users state from localStorage or set defaults
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Inactive' },
    ];
  });

  const [roles] = useState(['Admin', 'Editor', 'Viewer']);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Update localStorage whenever users state changes
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  // Filter users based on the search term
  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.email} ${user.role} ${user.status}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Add or Edit user
  const handleAddOrEditUser = (user) => {
    if (editingUser) {
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === editingUser.id ? { ...u, ...user } : u))
      );
    } else {
      setUsers((prevUsers) => [...prevUsers, { ...user, id: Date.now() }]);
    }
    setEditingUser(null);
    setShowModal(false);
  };

  // Delete user
  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter((u) => u.id !== id);
    setUsers(updatedUsers);
  };

  return (
    <div className="container">
      <h2 className="my-4">User Management</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control mb-4"
        style={{ maxWidth: '300px' }}
      />

      {/* User Table */}
      <UserTable
        users={filteredUsers} // Pass filtered users to the table
        roles={roles}
        onAdd={(user) => handleAddOrEditUser(user)}
        onEdit={(user) => handleAddOrEditUser(user)}
        onDelete={handleDeleteUser}
      />

      {/* Modal for Add/Edit User */}
      <ModalForm
        title={editingUser ? 'Edit User' : 'Add User'}
        fields={[
          { name: 'name', label: 'Name', type: 'text' },
          { name: 'email', label: 'Email', type: 'email' },
          { name: 'role', label: 'Role', type: 'select', options: roles },
          { name: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive'] },
        ]}
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddOrEditUser}
        initialData={editingUser}
      />
    </div>
  );
};

export default UserManagement;
