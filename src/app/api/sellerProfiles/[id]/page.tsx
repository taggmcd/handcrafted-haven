import React, { useEffect, useState } from 'react';

const SellerProfiles: React.FC = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      const response = await fetch('/api/sellerProfiles');
      const data = await response.json();
      setProfiles(data);
      console.log('Fetched profiles:', data);
    };
    
    fetchProfiles();
  }, []);

  return (
    <div>
      <h1>Seller Profiles</h1>
      <ul>
        {profiles.map((profile) => (
          <li key={profile._id}>{profile.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SellerProfiles;
