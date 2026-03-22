"use client";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 p-4">
      <div className="text-center space-y-6 max-w-2xl">
        <h1 className="text-6xl font-bold text-white">
          Flexiberry Marketplace
        </h1>
        <p className="text-2xl text-blue-100">
          Next.js 16 Migration Successful
        </p>
        <p className="text-lg text-blue-200">
          Your marketplace is now running on Next.js with React 18
        </p>
        
        <div className="pt-8 space-y-3">
          <p className="text-sm text-blue-300">Available Routes:</p>
          <ul className="text-blue-200 space-y-2 text-left inline-block">
            <li>• <code className="text-blue-100">/shop</code> - Shop page</li>
            <li>• <code className="text-blue-100">/products</code> - All products</li>
            <li>• <code className="text-blue-100">/cart</code> - Shopping cart</li>
            <li>• <code className="text-blue-100">/login</code> - User login</li>
            <li>• <code className="text-blue-100">/vendor/login</code> - Vendor portal</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
