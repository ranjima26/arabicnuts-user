import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== 'admin') {
      return NextResponse.json({ message: "Not authorized" }, { status: 403 });
    }

    await connectDB();

    const orders = await Order.find({}).sort({ createdAt: -1 }).populate('user', 'name email');

    return NextResponse.json(orders);
  } catch (error: any) {
    return NextResponse.json(
      { message: "Fetching all orders failed", error: error.message },
      { status: 500 }
    );
  }
}
