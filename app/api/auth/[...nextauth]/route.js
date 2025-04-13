import connectDB from "@/app/db/connectdb"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import User from "@/app/models/user"
import Credentials from "next-auth/providers/credentials"

export const authOptions = NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      }),

      Credentials({
        name: "Credentials",
        async authorize(credentials, req) {
            const {email,password} = credentials
            await connectDB()
            const existinguser = await User.findOne({email,password})
            if(existinguser){
              return existinguser
            }
            else{
              throw new Error("Invalid credentials")
            }

        }
      })
    
    // ...add more providers here
  ],
  callbacks:{
    async signIn({user,account,profile}){
      await connectDB()
      if(account.provider === "google" || account.provider === "facebook"){
        const existinguser = await User.findOne({email:user.email,isVerified:true})
        if(existinguser){
          return true
        }
        else{
          await User.create({
            name:user.name,
            email:user.email,
            isVerified:false
          })
          return true
        }
      }
      
      if(account.provider === "credentials"){
        const {email,password} = user
        let existinguser = await User.findOne({email,password})
        if(existinguser){
          return true
        }
        else{
          return true
        }
      }

      return false
    }
  },
  session: {
    strategy: "jwt",
  },

secret: process.env.NEXTAUTH_SECRET,
})

export { authOptions as GET, authOptions as POST }
