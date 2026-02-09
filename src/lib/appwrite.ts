import { Client, Account, Databases, Query } from "appwrite";

// Initialize Appwrite Client
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "");

// Initialize Services
export const account = new Account(client);
export const databases = new Databases(client);

// Export database and collection IDs (set these from your Appwrite console)
export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "";
export const TODOS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_TODOS_COLLECTION_ID || "";

export { Query };
