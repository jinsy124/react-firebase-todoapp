import {IndexType, OrderBy, Permission} from "node-appwrite"

import {db,questionCollection} from "../name"
import { databases } from "./config"


export default async function createQuestionCollection() {
    // create collection
    await databases.createCollection(db, questionCollection, 
        questionCollection, [
            Permission.read("any"),
            Permission.read("users"),
            Permission.create("users"),
            Permission.update("users"),
            Permission.delete("users"),
        ])
        console.log("Question collection is created")
        //creating attributes and index

        await Promise.all([
            databases.createStringAttribute(db, questionCollection, "title", 100, true),
            databases.createBooleanAttribute(db, questionCollection, "isCompleted", false, false),
            databases.createStringAttribute(db, questionCollection, "userId", 100, true),

            databases.createDatetimeAttribute(db, questionCollection, "createdAt", true),
            databases.createDatetimeAttribute(db, questionCollection, "updatedAt", false),
        ])
        console.log("Question collection attributes are created")

        // Wait for attributes to be available
        /* await new Promise(resolve => setTimeout(resolve, 1000)) 

       // create question indexes
        await Promise.all([
        databases.createIndex(
            db,
            questionCollection,
            "user_created_index",
            IndexType.Key,
            ["userId", "createdAt"],
            [OrderBy.Desc]
        ),
        ])

        console.log("Question collection index is created") */

}