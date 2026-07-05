"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";

export default function PremiumPage() {
  const { data: session } = useSession();
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    // Check if user is premium from session or localStorage
    if (session?.user) {
      setIsPremium(session.user.isPremium || false);
    }
  }, [session]);
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Edit Profile Section */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h1 className="text-2xl text-black font-bold mb-6">Edit Profile</h1>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-green-100 overflow-hidden">
              <img src="https://ui-avatars.com/api/?name=Abc" alt="Profile" />
            </div>
            <div>
              <p className="font-bold text-lg">Abc</p>
              <p className="text-gray-600 text-sm">aborty174@gmail.com</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input 
                type="text" 
                defaultValue="Abc" 
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image URL</label>
              <input 
                type="text" 
                placeholder="https://..." 
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
              />
            </div>

            <button className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition">
              Save Changes
            </button>
          </div>
        </div>

        {/* Go Premium Card */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
          <div className="text-4xl mb-4">👑</div>
          <h2 className="text-2xl text-black font-bold mb-2">Go Premium</h2>
          <p className="text-gray-500 mb-6">Unlock unlimited recipe uploads and exclusive features</p>
          
          <ul className="text-left w-full space-y-3 mb-8">
            <li className="flex items-center gap-2 text-green-700">✓ Unlimited recipe uploads</li>
            <li className="flex items-center gap-2 text-green-700">✓ Premium profile badge</li>
            <li className="flex items-center gap-2 text-green-700">✓ Priority visibility</li>
            <li className="flex items-center gap-2 text-green-700">✓ Exclusive features</li>
          </ul>

          {isPremium ? (
            <div className="w-full">
              <div className="text-3xl font-bold text-green-600 mb-4">✓</div>
              <p className="text-gray-600 font-semibold mb-2">Premium Member</p>
              <p className="text-gray-500 text-sm">You have lifetime access to all premium features</p>
            </div>
          ) : (
            <>
              <div className="text-3xl font-bold text-orange-500 mb-6">$9.99 <span className="text-sm text-gray-400 font-normal">/ lifetime</span></div>

              <form action="/api/payment/premium" method="POST" className="w-full">
                <button 
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition flex items-center justify-center gap-2"
                >
                  <span>👑</span> Upgrade to Premium
                </button>
              </form>
            </>
          )}
        </div>

      </div>
    </div>
  );
}