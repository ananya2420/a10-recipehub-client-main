import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-gray-50">
      {/* Illustration Section */}
      <div className="text-9xl mb-8">🔍</div>
      
      {/* Error Message */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
        Page Not Found
      </h1>
      <p className="text-gray-600 mb-8 max-w-md">
        Oops! The recipe or page you are looking for has been moved or does not exist. 
        Let us get you back to our gallery.
      </p>

      {/* Back Home Button */}
      <Link 
        href="/recips" 
        className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg hover:shadow-xl"
      >
        Back to Gallery
      </Link>
    </div>
  );
}