import connectDB from "@/app/db/connectdb";
import { NextResponse } from "next/server";
import User from "@/app/models/user";

export async function POST(request) {
    let data = await request.json();
    console.log(data);
    await connectDB();
    const {email, name, age, password} = data
    let updated =await User.updateOne({email:email}, {age:age, isVerified:true, password:password,name:name})
    console.log(updated);
    return NextResponse.json({message:"Account Created Successfully", status:200})

}