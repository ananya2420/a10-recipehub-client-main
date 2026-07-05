export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      <div className="h-6 w-32 bg-gray-200 rounded mb-6"></div>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Placeholder */}
          <div className="h-96 bg-gray-200 rounded-xl"></div>
          
          {/* Info Placeholders */}
          <div className="space-y-4">
            <div className="h-10 w-3/4 bg-gray-200 rounded"></div>
            <div className="h-8 w-1/4 bg-gray-200 rounded"></div>
            <div className="h-6 w-1/2 bg-gray-200 rounded-full"></div>
            <div className="mt-6 pt-6 border-t space-y-2">
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
            </div>
            <div className="mt-8 h-12 w-full bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}