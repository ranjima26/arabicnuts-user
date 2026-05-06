import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  return NextResponse.json({ message: `Product ${params.id} details` });
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  return NextResponse.json({ message: `Product ${params.id} updated` });
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  return NextResponse.json({ message: `Product ${params.id} deleted` });
}
