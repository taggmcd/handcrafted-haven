import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase, closeDatabaseConnection } from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { client, db } = await connectToDatabase();

        // Perform database operations, e.g., fetching data
        const sellerProfiles = await db.collection('sellerProfiles').find({}).toArray();

        res.status(200).json(sellerProfiles);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching seller profiles' });
    } finally {
        await closeDatabaseConnection(); // Ensure connection is closed
    }
}
