import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import { getAuthUser } from "@/lib/auth-helper";

export async function GET() {
  try {
    const session = await getAuthUser();
    if (!session || session.user.role !== "admin") return NextResponse.json({ message: "Not authorized" }, { status: 403 });
    await connectDB();
    const orders = await Order.find({}).sort({ createdAt: -1 }).populate("user", "name email");
    return NextResponse.json(orders);
  } catch (error: any) {
    return NextResponse.json({ message: "Fetching all orders failed", error: error.message }, { status: 500 });
  }
}
