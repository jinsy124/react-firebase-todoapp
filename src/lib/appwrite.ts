import { Client, Account, Databases, Query } from "appwrite";

// Initialize Appwrite Client
const APPWRITE_ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1";
const APPWRITE_PROJECT = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "";

if (!APPWRITE_PROJECT) {
  // Helpful runtime warning to diagnose 401s from missing project id
  // eslint-disable-next-line no-console
  console.warn("NEXT_PUBLIC_APPWRITE_PROJECT_ID is not set. Appwrite requests will be unauthorized (401). Set it in .env.local.");
}

const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT);

// Initialize Services
export const account = new Account(client);
export const databases = new Databases(client);

// Export database and collection IDs (set these from your Appwrite console)
export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "";
export const TODOS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_TODOS_COLLECTION_ID || "";

export { Query };
