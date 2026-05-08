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
    const user = await User.findById(session.user.id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (location) user.location = location;
    await user.save();
    return NextResponse.json({ success: true, user: { name: user.name, email: user.email } });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
