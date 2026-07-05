import React from 'react';

const users = [
  { id: 1, name: 'Admin', email: 'admin@gmail.com', role: 'Admin', status: 'Active', premium: false },
  { id: 2, name: 'Alec', email: 'alec@gmail.com', role: 'User', status: 'Active', premium: true },
  { id: 3, name: 'Rafi Islam', email: 'rafi@gmail.com', role: 'User', status: 'Blocked', premium: false },
];

export default function ManageUsers() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900">Manage Users 👥</h2>
        <p className="text-sm text-gray-500">Block/unblock users and manage roles</p>
      </div>

      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase">
            <th className="px-6 py-4">User</th>
            <th className="px-6 py-4">Role</th>
            <th className="px-6 py-4">Premium Status</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50/50">
              <td className="px-6 py-4">
                <div className="font-medium text-gray-900">{user.name}</div>
                <div className="text-xs text-gray-400">{user.email}</div>
              </td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded text-xs font-medium ${user.role === 'Admin' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                  {user.role}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {user.premium ? <span className="text-yellow-600 font-medium">👑 Premium</span> : 'Free'}
              </td>
              <td className="px-6 py-4">
                <span className={`text-xs font-medium ${user.status === 'Active' ? 'text-green-600' : 'text-red-500'}`}>
                  ● {user.status}
                </span>
              </td>
              <td className="px-6 py-4">
                <button className={`px-3 py-1 rounded-lg text-xs font-medium transition ${user.status === 'Blocked' ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-red-50 text-red-600 hover:bg-red-100'}`}>
                  {user.status === 'Blocked' ? 'Unblock' : 'Block'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}