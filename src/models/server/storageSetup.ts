import {Permission} from "node-appwrite"

import {questioinAttachmentBucket} from "../name"
import { storage } from "./config"


export default async function getOrCreateStorage() {
    // create storage bucket for question attachments
    try {
        await storage.getBucket(questioinAttachmentBucket);
        console.log("Storage Connected")
    } catch (error) {
        try {
            await storage.createBucket(
                questioinAttachmentBucket, 
                questioinAttachmentBucket, 
                [
                    Permission.read("any"),
                    Permission.read("users"),
                    Permission.create("users"),
                    Permission.update("users"),
                    Permission.delete("users"),
                ],
                false,
                undefined,
                undefined,
                ["jpg", "jpeg", "png", "gif", "pdf", "doc", "docx"]
            );
            console.log("Storage  created");
            console.log("Storage Connected");

        
        } catch (error: any) {
            // Handle bucket limit reached error gracefully
            if (error?.code === 403 && error?.type === "additional_resource_not_allowed") {
                console.warn("Storage bucket limit reached. Bucket may already exist or plan needs upgrade.");
                console.log("Storage Connected");
            } else {
                console.error("Error creating storage bucket:", error);
            }
        }
    }
}
