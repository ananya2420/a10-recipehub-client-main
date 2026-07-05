"use client";
import React, { useEffect, useState } from 'react';
import { getAllRecips } from '@/lib/api/recipe';

const LOCAL_DELETED_KEY = 'deletedRecipeIds';

const saveDeletedIds = (ids) => {
  try {
    localStorage.setItem(LOCAL_DELETED_KEY, JSON.stringify(ids));
  } catch {
    // ignore storage issues
  }
};

// Modular styles for consistent Admin UI
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
  actionBtn: "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
};

export default function RecipeReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadReports() {
      try {
        const recipes = await getAllRecips();
        setReports(
          recipes.map((recipe) => ({
            id: recipe._id,
            recipeTitle: recipe.title || recipe.name || 'Untitled Recipe',
            reporter: 'System Audit',
            reason: recipe.featured ? 'Featured Review' : 'Content Check',
          }))
        );
      } catch (err) {
        console.error('Failed to load reports', err);
        setError(err.message || 'Unable to load reports');
      } finally {
        setLoading(false);
      }
    }

    loadReports();
  }, []);

  const getReasonStyle = (reason) => {
    switch (reason) {
      case 'Spam': return 'bg-yellow-50 text-yellow-700 border-yellow-100';
      case 'Copyright Issue': return 'bg-red-50 text-red-700 border-red-100';
      case 'Offensive Content': return 'bg-orange-50 text-orange-700 border-orange-100';
      case 'Featured Review': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Content Check': return 'bg-green-50 text-green-700 border-green-100';
      default: return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  const handleAction = (id) => {
    setReports((prev) => prev.filter((report) => report.id !== id));
    const nextDeleted = [];
    try {
      const raw = localStorage.getItem(LOCAL_DELETED_KEY);
      const existing = raw ? JSON.parse(raw) : [];
      if (!existing.includes(id)) {
        nextDeleted.push(...existing, id);
      } else {
        nextDeleted.push(...existing);
      }
      saveDeletedIds(nextDeleted);
    } catch {
      // ignore local storage issues
    }
  };

  if (loading) {
    return (
      <div className={adminStyles.pageContainer}>
        <header>
          <h1 className={adminStyles.header}>Recipe Reports 🚨</h1>
        </header>
        <div className="text-gray-600">Loading reports...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={adminStyles.pageContainer}>
        <header>
          <h1 className={adminStyles.header}>Recipe Reports 🚨</h1>
        </header>
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className={adminStyles.pageContainer}>
      <header>
        <h1 className={adminStyles.header}>Recipe Reports 🚨</h1>
      </header>

      <div className={adminStyles.tableWrapper}>
        <table className={adminStyles.table}>
          <thead className={adminStyles.tableHeader}>
            <tr>
              <th className={adminStyles.th}>Recipe Title</th>
              <th className={adminStyles.th}>Reporter</th>
              <th className={adminStyles.th}>Reason</th>
              <th className={`${adminStyles.th} text-right`}>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {reports.length > 0 ? (
              reports.map((r) => (
                <tr key={r.id} className={adminStyles.tr}>
                  <td className="px-6 py-4 font-semibold text-gray-900">{r.recipeTitle}</td>
                  <td className={adminStyles.td}>{r.reporter}</td>
                  <td className="px-6 py-4">
                    <span className={`${adminStyles.badge} ${getReasonStyle(r.reason)}`}>
                      {r.reason}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button 
                      onClick={() => handleAction(r.id)}
                      className={`${adminStyles.actionBtn} bg-red-50 text-red-600 hover:bg-red-100`}
                    >
                      Remove
                    </button>
                    <button 
                      onClick={() => handleAction(r.id)}
                      className={`${adminStyles.actionBtn} bg-gray-100 text-gray-600 hover:bg-gray-200`}
                    >
                      Dismiss
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-12 text-center text-gray-400">No pending reports.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}