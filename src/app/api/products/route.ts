import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import Product from "@/models/Product";
import mongoose from "mongoose";

// Ensure connection helper
async function dbConnect() {
  await clientPromise;
  if (mongoose.connection.readyState !== 1) {
    // Note: clientPromise usually handles the connection, but if using Mongoose models
    // we need to make sure Mongoose itself is connected to the URI.
    const uri = process.env.MONGODB_URI!;
    await mongoose.connect(uri);
  }
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1") || 1;
    const limit = parseInt(url.searchParams.get("limit") || "10") || 10;
    const keyword = url.searchParams.get("keyword") || "";
    const category = url.searchParams.get("category") || "";

    const skip = (page - 1) * limit;

    const query: any = {};

    if (keyword) {
      query.name = { $regex: keyword, $options: "i" };
    }

    if (category) {
      query.category = category;
    }

    const allProducts = await Product
      .find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalProducts = await Product.countDocuments(query);

    return NextResponse.json(
      {
        success: true,
        allProducts,
        totalProducts,
        currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const product = await Product.create(body);
    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Error creating product" },
      { status: 500 },
    );
  }
}
