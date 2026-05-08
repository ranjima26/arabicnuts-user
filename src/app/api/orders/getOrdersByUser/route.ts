import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import { getAuthUser } from "@/lib/auth-helper";

export async function GET() {
  try {
    const session = await getAuthUser();
    if (!session) return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    await connectDB();
    const orders = await Order.find({ user: session.user.id }).sort({ createdAt: -1 });
    return NextResponse.json(orders);
  } catch (error: any) {
    return NextResponse.json({ message: "Fetching orders failed", error: error.message }, { status: 500 });
  }
}
