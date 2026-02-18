import { Inngest } from "inngest"
import { ConnectDB } from "./db.js"
import User from "../models/User.js"
import { deleteStreamUser, upsertStreamUser } from "./stream.js"

export const inngest = new Inngest({ id: "rudra-talent-iq" })

const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    console.log("======================================")
    console.log("🔥 sync-user FUNCTION TRIGGERED")
    console.log("Full event received:", JSON.stringify(event, null, 2))
    console.log("======================================")

    try {
      console.log("Connecting to DB...")
      await ConnectDB()
      console.log("DB connected successfully inside sync-user")

      const { id, email_addresses, first_name, last_name, image_url } = event.data

      console.log("Extracted Clerk Data:")
      console.log("Clerk ID:", id)
      console.log("Email addresses:", email_addresses)
      console.log("First Name:", first_name)
      console.log("Last Name:", last_name)
      console.log("Image URL:", image_url)

      const newUser = {
        clerkId: id,
        email: email_addresses?.[0]?.email_address,
        name: `${first_name || ""} ${last_name || ""}`,
        profileImage: image_url
      }

      console.log("Prepared newUser object:", newUser)

      const dbResponse = await User.create(newUser)
      console.log("✅ MongoDB user created successfully:", dbResponse)

      const streamPayload = {
        id: newUser.clerkId?.toString(),
        name: newUser.name,
        image: newUser.profileImage
      }

      console.log("Calling upsertStreamUser with payload:", streamPayload)

      const streamResponse = await upsertStreamUser(streamPayload)

      console.log("✅ Stream upsertUser completed")
      console.log("Stream response:", streamResponse)

    } catch (error) {
      console.error("❌ ERROR inside sync-user function:")
      console.error(error)
      throw error // Important so Inngest can retry
    }
  }
)

const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user-from-db" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    console.log("======================================")
    console.log("🔥 delete-user-from-db FUNCTION TRIGGERED")
    console.log("Full event received:", JSON.stringify(event, null, 2))
    console.log("======================================")

    try {
      console.log("Connecting to DB...")
      await ConnectDB()
      console.log("DB connected successfully inside delete-user")

      const { id } = event.data
      console.log("Clerk ID to delete:", id)

      const dbDelete = await User.deleteOne({ clerkId: id })
      console.log("MongoDB delete result:", dbDelete)

      console.log("Calling deleteStreamUser with ID:", id?.toString())

      const streamDeleteResponse = await deleteStreamUser(id?.toString())

      console.log("✅ Stream deleteUser completed")
      console.log("Stream delete response:", streamDeleteResponse)

    } catch (error) {
      console.error("❌ ERROR inside delete-user-from-db function:")
      console.error(error)
      throw error
    }
  }
)

export const functions = [syncUser, deleteUserFromDB]
