import NextAuth from "next-auth"
import DiscordProvider from "next-auth/providers/discord";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../lib/mongodb"

export const authOptions = {
  // Configure one or more authentication providers
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET
    })
  ]
}

export default NextAuth(authOptions)