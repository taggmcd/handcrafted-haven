"use client"; // This line marks the component as a Client Component

import React, { useState } from 'react';
import { Product } from '../../../types'; // Adjust the path according to your structure

const CreateProfile = () => {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [story, setStory] = useState<string>('');
    const [products, setProducts] = useState<Product[]>([{ name: '', description: '' }]); // Initialize with Product type

    const handleProductChange = (index: number, field: keyof Product, value: string) => {
        const newProducts = [...products];
        newProducts[index][field] = value; // Ensure field is a key of Product
        setProducts(newProducts);
    };

    const addProduct = () => {
        setProducts([...products, { name: '', description: '' }]); // Add an empty product
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const response = await fetch('/api/sellerProfiles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, description, story, products }),
        });

        if (response.ok) {
            console.log('Profile created successfully');
            // Optionally, redirect to the list page or show a success message
        } else {
            console.error('Failed to create profile');
            // Optionally, show an error message
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-softGrayPurple">
            <div className="w-full max-w-2xl p-6 bg-blushPink rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center text-mutedLavenderPink">Create Seller Profile</h1>
                <form onSubmit={handleSubmit} className="mt-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-mutedLavenderPink">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="mt-1 block w-full p-2 border border-desaturatedMint rounded"
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="description" className="block text-sm font-medium text-mutedLavenderPink">Description:</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="mt-1 block w-full p-2 border border-desaturatedMint rounded"
                        ></textarea>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="story" className="block text-sm font-medium text-mutedLavenderPink">Your Story:</label>
                        <textarea
                            id="story"
                            value={story}
                            onChange={(e) => setStory(e.target.value)}
                            required
                            className="mt-1 block w-full p-2 border border-desaturatedMint rounded"
                        ></textarea>
                    </div>
                    <div className="mt-4">
                        <h2 className="text-lg font-medium text-mutedLavenderPink">Products:</h2>
                        {products.map((product, index) => (
                            <div key={index} className="mt-2">
                                <input
                                    type="text"
                                    placeholder="Product Name"
                                    value={product.name}
                                    onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                                    className="block w-full p-2 border border-desaturatedMint rounded"
                                    required
                                />
                                <textarea
                                    placeholder="Product Description"
                                    value={product.description}
                                    onChange={(e) => handleProductChange(index, 'description', e.target.value)}
                                    className="mt-1 block w-full p-2 border border-desaturatedMint rounded"
                                    required
                                ></textarea>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addProduct}
                            className="mt-2 px-4 py-2 text-white bg-deepBlue rounded hover:bg-darkBlue"
                        >
                            Add Another Product
                        </button>
                    </div>
                    <button type="submit" className="mt-4 w-full px-4 py-2 text-white bg-brightGreen rounded hover:bg-deepGreen">
                        Create Profile
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateProfile;
