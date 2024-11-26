import React from 'react';
import { Table, Form } from 'react-bootstrap';

const PermissionTable = ({ permissions, onPermissionToggle }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Feature</th>
          <th>Permissions</th>
        </tr>
      </thead>
      <tbody>
        {permissions.map((group) => (
          <tr key={group.feature}>
            <td>{group.feature}</td>
            <td>
              {group.permissions.map((perm) => (
                // Ensure perm is an object with 'name' and 'selected' properties
                <Form.Check
                  key={perm.name}  // Use perm.name as the key if it's unique
                  inline
                  type="checkbox"
                  label={perm.name} // Ensure 'name' is rendered correctly
                  checked={perm.selected} // Ensure 'selected' is a boolean
                  onChange={() => onPermissionToggle(group.feature, perm.name)}
                />
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PermissionTable;
