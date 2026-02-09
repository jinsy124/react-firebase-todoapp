import {IndexType, OrderBy, Permission} from "node-appwrite"

import {db, voteCollection} from "../name"
import { databases } from "./config"


export default async function createVoteCollection() {
    // create collection
    await databases.createCollection(db, voteCollection, 
        voteCollection, [
            Permission.read("any"),
            Permission.read("users"),
            Permission.create("users"),
            Permission.update("users"),
            Permission.delete("users"),
        ]);
        console.log("Vote collection is created")
        
        //creating attributes and index
        await Promise.all([
            databases.createEnumAttribute(db, voteCollection,"type", ["upvote", "downvote"], true),
            databases.createEnumAttribute(db, voteCollection,"voteStatus",["upvoted", "downvoted"], true),
            databases.createStringAttribute(db, voteCollection, "voteById", 50, true),
        ]);
        console.log("Vote collection attributes are created")

        // Wait for attributes to be available
        await new Promise(resolve => setTimeout(resolve, 1000))

        // create vote indexes
        await Promise.all([
            databases.createIndex(
                db,
                voteCollection,
                "voteBy_index",
                IndexType.Key,
                ["voteById"],
            ),
        ])

        console.log("Vote collection indexes are created")

}
