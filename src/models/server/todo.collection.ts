import { IndexType, OrderBy, Permission } from "node-appwrite"

import { db, todosCollection } from "../name"
import { databases } from "./config"


export default async function createTodoCollection() {
    // create collection
    await databases.createCollection(db, todosCollection,
        todosCollection, [
            Permission.read("any"),
            Permission.read("users"),
            Permission.create("users"),
            Permission.update("users"),
            Permission.delete("users"),
        ])
    console.log("Todo collection is created")

    // creating attributes
    await Promise.all([
        databases.createStringAttribute(db, todosCollection, "title", 200, true),
        databases.createBooleanAttribute(db, todosCollection, "completed", false, false),
        databases.createStringAttribute(db, todosCollection, "userId", 100, true),
        databases.createDatetimeAttribute(db, todosCollection, "createdAt", true),
        databases.createDatetimeAttribute(db, todosCollection, "updatedAt", false),
    ])
    console.log("Todo collection attributes are created")

    // Wait for attributes to be available
    await new Promise(resolve => setTimeout(resolve, 1000))

    // create indexes
    await Promise.all([
        databases.createIndex(
            db,
            todosCollection,
            "user_created_index",
            IndexType.Key,
            ["userId", "createdAt"],
            [OrderBy.Desc]
        ),
        databases.createIndex(
            db,
            todosCollection,
            "user_index",
            IndexType.Key,
            ["userId"],
        ),
    ])

    console.log("Todo collection indexes are created")
}
