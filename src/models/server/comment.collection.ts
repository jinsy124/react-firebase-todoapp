import {IndexType, OrderBy, Permission} from "node-appwrite"

import {db, commentCollection} from "../name"
import { databases } from "./config"


export default async function createCommentCollection() {
    // create collection
    await databases.createCollection(db, commentCollection, 
        commentCollection, [
            Permission.read("any"),
            Permission.read("users"),
            Permission.create("users"),
            Permission.update("users"),
            Permission.delete("users"),
        ])
        console.log("Comment collection is created")
        
        //creating attributes and index
        await Promise.all([
            databases.createStringAttribute(db, commentCollection, "body", 5000, true),
            databases.createStringAttribute(db, commentCollection, "userId", 100, true),
            databases.createStringAttribute(db, commentCollection, "typeId", 50, true),
            databases.createEnumAttribute(db, commentCollection, "type", ["answer", "question"], true),
            databases.createDatetimeAttribute(db, commentCollection, "createdAt", true),
            databases.createDatetimeAttribute(db, commentCollection, "updatedAt", true),
        ])
        console.log("Comment collection attributes are created")

        // Wait for attributes to be available
        await new Promise(resolve => setTimeout(resolve, 1000))

        // create comment indexes
        await Promise.all([
            databases.createIndex(
                db,
                commentCollection,
                "typeId_index",
                IndexType.Key,
                ["typeId"],
            ),
            databases.createIndex(
                db,
                commentCollection,
                "user_index",
                IndexType.Key,
                ["userId"],
            ),
        ])

        console.log("Comment collection indexes are created")
}
