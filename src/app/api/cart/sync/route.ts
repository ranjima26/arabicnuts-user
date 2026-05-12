import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { getAuthUser } from "@/lib/auth-helper";

export async function POST(req: Request) {
  try {
    await connectDB();
    const session = await getAuthUser();

    if (!session) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    const { cartItems } = await req.json();

    const user = await User.findById((session.user as any).id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    user.cartItems = cartItems;
    await user.save();

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Cart sync error:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
