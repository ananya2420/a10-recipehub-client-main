"use client";
import { authClient } from "@/lib/auth-client";
import React, { useEffect, useState } from "react";

/**
 * UI Component Styles
 */
const styles = {
  pageContainer: "p-8 max-w-7xl mx-auto",
  header: "text-2xl font-bold mb-6 text-gray-900",
  tableWrapper: "bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden",
  table: "w-full text-left",
  tableHead: "bg-gray-50 text-xs font-semibold text-gray-500 uppercase",
  th: "px-6 py-4",
  td: "px-6 py-4 text-gray-600",
  titleTd: "px-6 py-4 font-medium text-gray-900",
  actionBtn: "font-bold hover:underline text-sm",
  featureBtn: "text-xl transition-transform hover:scale-110",
  loadingState: "text-gray-600",
  errorState: "text-red-600",
  emptyState: "px-6 py-12 text-center text-gray-500"
};

const LOCAL_FEATURED_KEY = "featuredRecipeIds";
const LOCAL_DELETED_KEY = "deletedRecipeIds";

const loadIds = (key) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
};

const saveIds = (key, ids) => {
  try { localStorage.setItem(key, JSON.stringify(ids)); } catch {}
};

export default function ManageRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [featuredIds, setFeaturedIds] = useState(() => (typeof window !== "undefined" ? loadIds(LOCAL_FEATURED_KEY) : []));
  const [deletedIds, setDeletedIds] = useState(() => (typeof window !== "undefined" ? loadIds(LOCAL_DELETED_KEY) : []));


 


  useEffect(() => {
    async function fetchRecipes() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "";
        const res = await fetch(`${baseUrl}/recips`, { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);

        const data = await res.json();
        const recipesArray = data.data || data || [];
        const filtered = recipesArray
          .filter((r) => !deletedIds.includes(r._id))
          .map((r) => ({ ...r, featured: featuredIds.includes(r._id) ? true : !!r.featured }));

        setRecipes(filtered);
      } catch (err) {
        setError(err.message || "Unable to load recipes");
      } finally {
        setLoading(false);
      }
    }
    fetchRecipes();
  }, [deletedIds, featuredIds]);

  const toggleFeature = (id, currentlyFeatured) => {
    const nextFeatured = currentlyFeatured ? featuredIds.filter((fid) => fid !== id) : [...featuredIds, id];
    setFeaturedIds(nextFeatured);
    saveIds(LOCAL_FEATURED_KEY, nextFeatured);
    setRecipes((prev) => prev.map((r) => (r._id === id ? { ...r, featured: !currentlyFeatured } : r)));
  };

  const deleteRecipe = (id) => {
    const nextDeleted = [...deletedIds, id];
    const nextFeatured = featuredIds.filter((fid) => fid !== id);
    setDeletedIds(nextDeleted);
    saveIds(LOCAL_DELETED_KEY, nextDeleted);
    if (nextFeatured.length !== featuredIds.length) {
      setFeaturedIds(nextFeatured);
      saveIds(LOCAL_FEATURED_KEY, nextFeatured);
    }
    setRecipes((prev) => prev.filter((r) => r._id !== id));
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.header}>Manage Recipes 📋</h1>

      {loading ? (
        <div className={styles.loadingState}>Loading recipes...</div>
      ) : error ? (
        <div className={styles.errorState}>{error}</div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr>
                <th className={styles.th}>Recipe Title</th>
                <th className={styles.th}>Price</th>
                <th className={styles.th}>Stock</th>
                <th className={`${styles.th} text-center`}>Featured</th>
                <th className={`${styles.th} text-right`}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recipes.length > 0 ? (
                recipes.map((r) => (
                  <tr key={r._id} className="hover:bg-gray-50/50">
                    <td className={styles.titleTd}>{r.title}</td>
                    <td className={styles.td}>${r.price}</td>
                    <td className={styles.td}>{r.quantity}</td>
                    <td className="px-6 py-4 text-center">
                      <button onClick={() => toggleFeature(r._id, r.featured)} className={styles.featureBtn}>
                        {r.featured ? "⭐" : "☆"}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <button onClick={() => toggleFeature(r._id, r.featured)} className={`${styles.actionBtn} text-green-600`}>
                        {r.featured ? "Unfeature" : "Feature"}
                      </button>
                      <button onClick={() => deleteRecipe(r._id)} className={`${styles.actionBtn} text-red-600`}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="5" className={styles.emptyState}>No recipes available.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}