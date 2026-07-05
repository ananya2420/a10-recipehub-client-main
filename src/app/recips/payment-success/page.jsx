import { stripe } from '@/lib/stripe';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import PurchaseSaver from '@/app/components/PurchaseSaver';

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) throw new Error('Invalid session');

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items']
  });

  if (session.status === 'open') return redirect('/');

  if (session.status === 'complete') {
    // FIX: Serialize the session object into a plain object
    const plainSession = JSON.parse(JSON.stringify(session));

    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        {/* Pass the plain object instead of the raw Stripe object */}
        <PurchaseSaver session={plainSession} />
        
        <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 text-center max-w-md w-full">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful! 🎉</h2>
          <p className="text-gray-500 mb-8">Your recipe has been unlocked!</p>

          <div className="bg-gray-50 p-4 rounded-xl text-left mb-8 border border-gray-100">
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-500">Payment Type</span>
              <span className="font-semibold text-gray-900">Recipe Purchase</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-500">Status</span>
              <span className="font-semibold text-green-600">✓ Completed</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-500">Session</span>
              <span className="font-mono text-gray-900 text-sm truncate max-w-[150px]">{session_id}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Link href="/dashboard" className="py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition">
              Go to Dashboard →
            </Link>
            <Link href="/recips" className="py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition">
              Browse Recipes
            </Link>
          </div>
        </div>
      </main>
    );
  }
}