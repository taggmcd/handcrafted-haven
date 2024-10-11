// src/app/seller-profiles/page.tsx

import React from 'react';
import Link from 'next/link'; // Import Link for navigation

const SellerProfilesPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center">Seller Profiles</h1>
                <p className="mt-2 text-center text-gray-600">Welcome to the Seller Profiles page!</p>

                <div className="mt-6">
                    <Link href="/seller-profiles/create" className="inline-block px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        Create Seller Profile
                    </Link>
                    {/* You can add more links or buttons here */}
                </div>
            </div>
        </div>
    );
};

export default SellerProfilesPage; // Ensure you're exporting a valid React component
