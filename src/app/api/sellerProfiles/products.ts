import { NextApiRequest, NextApiResponse } from 'next';

const products = [
  { id: '1', name: 'Product 1', imageUrl: '/images/product1.jpg', category: 'category1', price: 100 },
  { id: '2', name: 'Product 2', imageUrl: '/images/product2.jpg', category: 'category2', price: 200 },
  // Add more products as needed
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(products);
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
