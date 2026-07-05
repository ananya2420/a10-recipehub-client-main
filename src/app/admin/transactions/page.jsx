"use client";
import React, { useState } from 'react';

// Modular styles
const adminStyles = {
  pageContainer: "p-8 max-w-7xl mx-auto space-y-6",
  header: "text-2xl font-bold text-gray-900 tracking-tight",
  tableWrapper: "bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden",
  table: "w-full text-left",
  tableHeader: "bg-gray-50/50 border-b border-gray-100",
  th: "px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider",
  tr: "hover:bg-gray-50/50 transition-colors border-b border-gray-50",
  td: "px-6 py-4 text-sm text-gray-700",
  badge: "px-3 py-1 rounded-full text-[10px] font-bold uppercase border",
};

export default function TransactionsPage() {
  // Mock data - replace with actual API fetch
  const [transactions] = useState([
    { id: "TXN-8821", user: "John Doe", amount: "$29.99", date: "Jun 20, 2026", status: "Success" },
    { id: "TXN-8822", user: "Sara Smith", amount: "$15.00", date: "Jun 21, 2026", status: "Pending" },
    { id: "TXN-8823", user: "Mike Ross", amount: "$49.99", date: "Jun 22, 2026", status: "Failed" },
    { id: "TXN-8824", user: "Emma W.", amount: "$29.99", date: "Jun 22, 2026", status: "Success" },
    { id: "TXN-8825", user: "David Lee", amount: "$15.00", date: "Jun 23, 2026", status: "Success" },
    { id: "TXN-8826", user: "Alice K.", amount: "$99.00", date: "Jun 24, 2026", status: "Success" },
  ]);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Success': return 'bg-green-50 text-green-700 border-green-100';
      case 'Pending': return 'bg-yellow-50 text-yellow-700 border-yellow-100';
      case 'Failed': return 'bg-red-50 text-red-700 border-red-100';
      default: return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  return (
    <div className={adminStyles.pageContainer}>
      <h1 className={adminStyles.header}>Transactions 🧾</h1>

      <div className={adminStyles.tableWrapper}>
        <table className={adminStyles.table}>
          <thead className={adminStyles.tableHeader}>
            <tr>
              <th className={adminStyles.th}>Transaction ID</th>
              <th className={adminStyles.th}>User</th>
              <th className={adminStyles.th}>Amount</th>
              <th className={adminStyles.th}>Date</th>
              <th className={adminStyles.th}>Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {transactions.map((txn) => (
              <tr key={txn.id} className={adminStyles.tr}>
                <td className="px-6 py-4 font-mono text-sm font-semibold text-gray-900">{txn.id}</td>
                <td className={adminStyles.td}>{txn.user}</td>
                <td className="px-6 py-4 font-bold text-gray-900">{txn.amount}</td>
                <td className={adminStyles.td}>{txn.date}</td>
                <td className="px-6 py-4">
                  <span className={`${adminStyles.badge} ${getStatusStyle(txn.status)}`}>
                    {txn.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}