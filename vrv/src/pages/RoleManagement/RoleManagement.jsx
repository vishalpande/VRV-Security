import React, { useState } from 'react';
import RoleTable from '../../components/RoleTable/RoleTable';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const RoleManagement = () => {
  const [roles, setRoles] = useState([
    { id: 1, name: 'Admin', permissions: ['Read', 'Write', 'Delete'] },
    { id: 2, name: 'Editor', permissions: ['Read', 'Write'] },
  ]);

  const [permissionsList] = useState(['Read', 'Write', 'Delete']);
  const [showModal, setShowModal] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [roleData, setRoleData] = useState({ name: '', permissions: [] });

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
    if (editingRole) {
      setRoles((prev) =>
        prev.map((role) => (role.id === editingRole.id ? { ...editingRole, ...roleData } : role))
      );
    } else {
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

  return (
    <div>
      <h2>Role Management</h2>
      <Button variant="primary" onClick={() => handleShowModal()}>
        Add Role
      </Button>
      <RoleTable
        roles={roles}
        onEdit={handleShowModal}
        onDelete={(id) => setRoles((prev) => prev.filter((role) => role.id !== id))}
      />

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
