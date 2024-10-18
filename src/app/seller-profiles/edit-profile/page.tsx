"use client";
import React, { useState } from 'react';
import { Product } from '../../../types'; // Adjust the path according to your structure

const EditProfile: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [story, setStory] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([{ name: '', description: '' }]);

  const handleProductChange = (index: number, field: keyof Product, value: string) => {
    const newProducts = [...products];
    newProducts[index] = {
      ...newProducts[index],
      [field]: value,
    };
    setProducts(newProducts);
  };

  const addProduct = () => {
    setProducts([...products, { name: '', description: '' }]);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await fetch('/api/sellerProfiles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, story, products }),
    });
    if (response.ok) {
      console.log('Profile created successfully');
    } else {
      console.error('Failed to create profile');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Edit Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label htmlFor="story" className="block text-sm font-medium text-gray-700">Your Story</label>
            <textarea
              id="story"
              value={story}
              onChange={(e) => setStory(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            ></textarea>
          </div>
          <div>
            <h2 className="text-lg font-medium text-gray-700">Products</h2>
            {products.map((product, index) => (
              <div key={index} className="space-y-2">
                <input
                  type="text"
                  placeholder="Product Name"
                  value={product.name}
                  onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                  className="block w-full p-2 border border-gray-300 rounded"
                />
                <textarea
                  placeholder="Product Description"
                  value={product.description}
                  onChange={(e) => handleProductChange(index, 'description', e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                ></textarea>
              </div>
            ))}
            <button
              type="button"
              onClick={addProduct}
              className="mt-2 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Add Another Product
            </button>
          </div>
          <button
            type="submit"
            className="mt-4 w-full px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
