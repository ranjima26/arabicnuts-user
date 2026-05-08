import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(req: Request, context: any) {
  try {
    await connectDB();

    const { id: userId } = await context.params;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, context: any) {
  try {
    const body = await req.json();

    await connectDB();

    const { id: userId } = await context.params;

    const user = await User.findByIdAndUpdate(
      userId,
      body,
      { new: true }
    ).select("-password");

    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, context: any) {
  try {
    await connectDB();

    const { id: userId } = await context.params;

    await User.findByIdAndDelete(userId);

    return NextResponse.json({
      message: "User deleted",
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}