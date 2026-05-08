import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getAuthUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("firebase-token")?.value;

    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    
    if (!decoded) {
      return null;
    }

    return {
      user: {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
      }
    };
  } catch (error) {
    console.error("Auth helper error:", error);
    return null;
  }
}
