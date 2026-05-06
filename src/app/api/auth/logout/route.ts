import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Custom logout logic if needed, otherwise handled by NextAuth
  return NextResponse.json({ message: "Logout logic here" });
}
