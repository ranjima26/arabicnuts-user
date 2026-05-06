import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";
import mongoose from "mongoose";

// Ensure connection helper
async function dbConnect() {
  await clientPromise;
  if (mongoose.connection.readyState !== 1) {
    const uri = process.env.MONGODB_URI!;
    await mongoose.connect(uri);
  }
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const enquiries = await Enquiry.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, enquiries },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching enquiries:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    
    // Basic validation
    if (!body.fullName || !body.email || !body.message) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const enquiry = await Enquiry.create(body);
    
    return NextResponse.json(
      { success: true, message: "Enquiry submitted successfully", enquiry },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error submitting enquiry:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Error submitting enquiry" },
      { status: 500 }
    );
  }
}
