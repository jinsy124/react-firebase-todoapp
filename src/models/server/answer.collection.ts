import {IndexType, OrderBy, Permission} from "node-appwrite"

import {db, answerCollection} from "../name"
import { databases } from "./config"


export default async function createAnswerCollection() {
    // create collection
    await databases.createCollection(db, answerCollection, 
        answerCollection, [
            Permission.read("any"),
            Permission.read("users"),
            Permission.create("users"),
            Permission.update("users"),
            Permission.delete("users"),
        ])
        console.log("Answer collection is created")
        
        //creating attributes and index
        await Promise.all([
            databases.createStringAttribute(db, answerCollection, "body", 10000, true),
            databases.createStringAttribute(db, answerCollection, "userId", 100, true),
            databases.createStringAttribute(db, answerCollection, "questionId", 100, true),

            databases.createDatetimeAttribute(db, answerCollection, "createdAt", true),
            databases.createDatetimeAttribute(db, answerCollection, "updatedAt", true),
        ])
        console.log("Answer collection attributes are created")

        // Wait for attributes to be available
        await new Promise(resolve => setTimeout(resolve, 1000))

        // create answer indexes
        await Promise.all([
            databases.createIndex(
                db,
                answerCollection,
                "question_index",
                IndexType.Key,
                ["questionId"],
            ),
            databases.createIndex(
                db,
                answerCollection,
                "user_index",
                IndexType.Key,
                ["userId"],
            ),
        ])

        console.log("Answer collection indexes are created")

}
