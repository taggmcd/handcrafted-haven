"use client";
import React, { useEffect, useState } from 'react';

const SellerProfiles: React.FC = () => {
  const [profiles, setProfiles] = useState<any[]>([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      const response = await fetch('/api/sellerProfiles');
      const data = await response.json();
      if (Array.isArray(data)) {
        setProfiles(data);
      } else {
        console.error('Data is not an array:', data);
      }
    };
    
    fetchProfiles();
  }, []);

  const handleDelete = async (profileId: string) => {
    const response = await fetch('/api/sellerProfiles', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ companyId: profileId }),
    });
    
    if (response.ok) {
      setProfiles(profiles.filter(profile => profile._id !== profileId));
      console.log('Profile deleted successfully');
    } else {
      console.error('Failed to delete profile');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Seller Profiles</h1>
        <ul className="space-y-4">
          {profiles.map((profile) => (
            <li key={profile._id} className="p-4 bg-gray-50 rounded-md shadow hover:bg-gray-100 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">{profile.name}</h2>
                <p className="text-gray-600">{profile.description}</p>
              </div>
              <button
                onClick={() => handleDelete(profile._id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SellerProfiles;
