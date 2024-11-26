import React, { useState, useEffect } from 'react';
import RoleTable from '../../components/RoleTable/RoleTable';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const RoleManagement = () => {
  // Load roles from localStorage or set defaults
  const [roles, setRoles] = useState(() => {
    const savedRoles = localStorage.getItem('roles');
    return savedRoles
      ? JSON.parse(savedRoles)
      : [
          { id: 1, name: 'Admin', permissions: ['Read', 'Write', 'Delete'] },
          { id: 2, name: 'Editor', permissions: ['Read', 'Write'] },
        ];
  });

  const [permissionsList] = useState(['Read', 'Write', 'Delete']);
  const [showModal, setShowModal] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [roleData, setRoleData] = useState({ name: '', permissions: [] });
  const [searchTerm, setSearchTerm] = useState(''); // Search functionality
  const [sortField, setSortField] = useState('name'); // Sorting field
  const [sortOrder, setSortOrder] = useState('asc'); // Sorting order

  // Persist roles to localStorage
  useEffect(() => {
    localStorage.setItem('roles', JSON.stringify(roles));
    
  }, [roles]);

  // Handle opening modal
  const handleShowModal = (role = null) => {
    setEditingRole(role);
    setRoleData(role || { name: '', permissions: [] });
    setShowModal(true);
  };

  // Handle closing modal
  const handleCloseModal = () => {
    setShowModal(false);
    setRoleData({ name: '', permissions: [] });
    setEditingRole(null);
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!roleData.name.trim()) {
      alert('Role name is required.');
      return;
    }
    if (editingRole) {
      // Update role
      setRoles((prev) =>
        prev.map((role) =>
          role.id === editingRole.id ? { ...editingRole, ...roleData } : role
        )
      );
    } else {
      // Add new role
      if (roles.some((role) => role.name.toLowerCase() === roleData.name.toLowerCase())) {
        alert('A role with this name already exists.');
        return;
      }
      setRoles((prev) => [...prev, { id: Date.now(), ...roleData }]);
    }
    handleCloseModal();
  };

  // Handle permission toggle
  const togglePermission = (permission) => {
    setRoleData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((p) => p !== permission)
        : [...prev.permissions, permission],
    }));
  };

  // Handle sorting
  const handleSortChange = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Filter roles based on search term
  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort roles
  const sortedRoles = [...filteredRoles].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div>
      <h2>Role Management</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search roles..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '10px', padding: '5px', width: '200px' }}
      />

      <Button variant="primary" onClick={() => handleShowModal()} style={{ marginBottom: '10px' }}>
        Add Role
      </Button>

      <RoleTable
        roles={sortedRoles} // Pass filtered and sorted roles
        onEdit={handleShowModal}
        onDelete={(id) => setRoles((prev) => prev.filter((role) => role.id !== id))}
        onSortChange={handleSortChange} // Sorting handler
        sortField={sortField} // Current sort field
        sortOrder={sortOrder} // Current sort order
      />

      {/* Modal for Add/Edit Role */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editingRole ? 'Edit Role' : 'Add Role'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Role Name</Form.Label>
              <Form.Control
                type="text"
                value={roleData.name}
                onChange={(e) => setRoleData({ ...roleData, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Permissions</Form.Label>
              {permissionsList.map((permission) => (
                <Form.Check
                  key={permission}
                  type="checkbox"
                  label={permission}
                  checked={roleData.permissions.includes(permission)}
                  onChange={() => togglePermission(permission)}
                />
              ))}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {editingRole ? 'Update Role' : 'Add Role'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RoleManagement;
