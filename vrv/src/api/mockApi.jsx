const mockData = {
    users: [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Inactive' },
    ],
    roles: [
      { id: 1, name: 'Admin', permissions: ['Read', 'Write', 'Delete'] },
      { id: 2, name: 'Editor', permissions: ['Read', 'Write'] },
    ],
    permissions: [
      { feature: 'Users', permissions: ['Read', 'Write', 'Delete'] },
      { feature: 'Roles', permissions: ['Read', 'Write', 'Delete'] },
    ],
  };
  
  export const fetchUsers = () =>
    new Promise((resolve) => setTimeout(() => resolve([...mockData.users]), 1000));
  
  export const addUser = (user) =>
    new Promise((resolve) => {
      const newUser = { ...user, id: Date.now() };
      mockData.users.push(newUser);
      setTimeout(() => resolve(newUser), 1000);
    });
  
  export const updateUser = (updatedUser) =>
    new Promise((resolve) => {
      mockData.users = mockData.users.map((user) =>
        user.id === updatedUser.id ? { ...user, ...updatedUser } : user
      );
      setTimeout(() => resolve(updatedUser), 1000);
    });
  
  export const deleteUser = (id) =>
    new Promise((resolve) => {
      mockData.users = mockData.users.filter((user) => user.id !== id);
      setTimeout(() => resolve(id), 1000);
    });
  
  export const fetchRoles = () =>
    new Promise((resolve) => setTimeout(() => resolve([...mockData.roles]), 1000));
  
  export const addRole = (role) =>
    new Promise((resolve) => {
      const newRole = { ...role, id: Date.now() };
      mockData.roles.push(newRole);
      setTimeout(() => resolve(newRole), 1000);
    });
  
  export const updateRole = (updatedRole) =>
    new Promise((resolve) => {
      mockData.roles = mockData.roles.map((role) =>
        role.id === updatedRole.id ? { ...role, ...updatedRole } : role
      );
      setTimeout(() => resolve(updatedRole), 1000);
    });
  
  export const deleteRole = (id) =>
    new Promise((resolve) => {
      mockData.roles = mockData.roles.filter((role) => role.id !== id);
      setTimeout(() => resolve(id), 1000);
    });
  
  export const fetchPermissions = () =>
    new Promise((resolve) => setTimeout(() => resolve([...mockData.permissions]), 1000));
  