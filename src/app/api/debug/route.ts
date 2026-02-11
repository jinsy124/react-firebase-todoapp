import { NextResponse } from "next/server";
import { databases } from "@/lib/appwrite";
import { DATABASE_ID, TODOS_COLLECTION_ID } from "@/lib/appwrite";

export async function GET() {
  try {
    console.log("DEBUG: DATABASE_ID =", DATABASE_ID);
    console.log("DEBUG: TODOS_COLLECTION_ID =", TODOS_COLLECTION_ID);

    // Try to get the database
    const db = await databases.get(DATABASE_ID);
    console.log("DEBUG: Database found:", db);

    // Try to get the collection
    const collection = await databases.getCollection(DATABASE_ID, TODOS_COLLECTION_ID);
    console.log("DEBUG: Collection found:", collection);
    console.log("DEBUG: Collection permissions:", collection.permissions);

    return NextResponse.json({
      success: true,
      DATABASE_ID,
      TODOS_COLLECTION_ID,
      database: db,
      collection: {
        $id: collection.$id,
        name: collection.name,
        permissions: collection.permissions,
      },
    });
  } catch (error: any) {
    console.error("DEBUG Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || String(error),
        DATABASE_ID,
        TODOS_COLLECTION_ID,
      },
      { status: 500 }
    );
  }
}
