import { NextResponse } from "next/server";
import Product from "@/models/Product";

export async function GET(req: Request, context: any) {
  const { id } = await context.params;

  const product = await Product.findById(id);

  return NextResponse.json(product);
}

export async function PUT(req: Request, context: any) {
  const { id } = await context.params;

  return NextResponse.json({
    message: `Product ${id} updated`,
  });
}

export async function DELETE(req: Request, context: any) {
  const { id } = await context.params;

  return NextResponse.json({
    message: `Product ${id} deleted`,
  });
}