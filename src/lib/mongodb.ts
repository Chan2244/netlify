import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const options = {};

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Use a global variable to prevent multiple connections in development
if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

// Example usage to access a specific database
export const getDB = async () => {
  const client = await clientPromise;
  return client.db("your_database_name");
};