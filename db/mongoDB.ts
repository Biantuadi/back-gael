import { MongoClient, Db } from 'mongodb';

const url = 'mongodb://localhost:27017';
const dbName = 'your-database-name';

export async function connectToMongoDB(): Promise<Db> {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        console.log('Connected to MongoDB');
        return db;
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        throw error;
    }
}


