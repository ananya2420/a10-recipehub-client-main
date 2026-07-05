"use client";
import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';

export default function ReportPage({ params }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const [status, setStatus] = useState('');
  const [canSubmit, setCanSubmit] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');

  useEffect(() => {
    const checkEligibility = () => {
      const likes = parseInt(localStorage.getItem(`likes_${id}`) || '0', 10);
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      const eligible = likes > 0 || favorites.includes(id);
      setCanSubmit(eligible);
      if (!eligible) {
        setWarningMessage('Please like or save this recipe to favorites before submitting a report.');
      } else {
        setWarningMessage('');
      }
    };

    checkEligibility();
    window.addEventListener('storage', checkEligibility);
    window.addEventListener('favoritesChanged', checkEligibility);
    window.addEventListener('engagementChanged', checkEligibility);

    return () => {
      window.removeEventListener('storage', checkEligibility);
      window.removeEventListener('favoritesChanged', checkEligibility);
      window.removeEventListener('engagementChanged', checkEligibility);
    };
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (!formData.get('reason')) return;

    if (!canSubmit) {
      setStatus('warning');
      return;
    }

    setStatus('success');
  };

  if (status === 'success') {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 text-center max-w-sm w-full">
          <div className="text-4xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Report Submitted</h2>
          <p className="text-gray-500 mb-8">Thank you for helping us keep our community safe.</p>
          <Link href={`/recips/${id}`} className="block w-full py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition">
            Back to Recipe
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-lg mx-auto">
        {/* Navigation */}
        <Link href={`/recips/${id}`} className="inline-flex items-center text-sm text-gray-500 hover:text-black mb-8 transition">
          <span className="mr-2">←</span> Back to Recipe
        </Link>

        {/* Card */}
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Report this Recipe</h1>
          <p className="text-gray-500 text-sm mb-8">
            Reporting: <span className="font-semibold text-black">#{id}</span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Reasons Fieldset */}
            <fieldset className="space-y-4">
              <legend className="text-sm font-bold text-gray-900 mb-4">Reason for reporting *</legend>
              
              {['spam', 'offensive', 'copyright'].map((val) => (
                <label key={val} className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl cursor-pointer hover:border-green-200 hover:bg-green-50/50 transition">
                  <input type="radio" name="reason" value={val} className="w-5 h-5 accent-green-600" required />
                  <span className="text-gray-700 capitalize font-medium">{val.replace('issue', 'Issue')}</span>
                </label>
              ))}
            </fieldset>

            {/* Details Textarea */}
            <div>
              <label className="text-sm font-bold text-gray-900 block mb-2">Additional Details</label>
              <textarea 
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-600 outline-none transition" 
                rows={4} 
                placeholder="Help us understand the issue..."
              />
            </div>

            {warningMessage && (
              <p className="text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
                {warningMessage}
              </p>
            )}

            {/* Submit */}
            <button 
              type="submit" 
              className="w-full py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition shadow-lg shadow-green-100"
            >
              Submit Report
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}