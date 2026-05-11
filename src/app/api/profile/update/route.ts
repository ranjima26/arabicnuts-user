import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { getAuthUser } from "@/lib/auth-helper";

export async function PUT(req: Request) {
  try {
    const session = await getAuthUser();
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { name, email, phone, location } = await req.json();
    await connectDB();
    
    const mongoose = require('mongoose');
    const userId = new mongoose.Types.ObjectId(session.user.id);

    // Direct update to bypass any Mongoose schema issues
    const updateData = {
      ...(name !== undefined && { name }),
      ...(email !== undefined && { email }),
      ...(phone !== undefined && { phone }),
      ...(location !== undefined && { userAddress: location }),
      updatedAt: new Date()
    };

    const result = await mongoose.connection.db.collection('users').updateOne(
      { _id: userId },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
