import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import icons for better visual representation

const RoleTable = ({ roles, onEdit, onDelete }) => {
  return (
    <div className="table-responsive">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Role</th>
            <th>Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.length > 0 ? (
            roles.map((role) => (
              <tr key={role.id}>
                <td>{role.name}</td>
                <td>{role.permissions.length > 0 ? role.permissions.join(', ') : 'No Permissions Assigned'}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => onEdit(role)}
                    aria-label={`Edit role ${role.name}`}
                    className="me-2"
                  >
                    <FaEdit /> Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDelete(role.id)}
                    aria-label={`Delete role ${role.name}`}
                  >
                    <FaTrash /> Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No roles available.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default RoleTable;
