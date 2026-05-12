import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import { getAuthUser } from "@/lib/auth-helper";

export async function POST(req: Request) {
  try {
    const session = await getAuthUser();
    if (!session) return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    
    const { orderItems, shippingAddress, paymentMethod, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice, clearCart } = await req.json();
    
    if (!orderItems || orderItems.length === 0) return NextResponse.json({ message: "No order items" }, { status: 400 });
    await connectDB();
    
    // Helper: only use a value as ObjectId when it looks like one (24-char hex)
    const toObjectId = (val: any) => {
      if (val && typeof val === "string" && /^[a-f\d]{24}$/i.test(val)) return val;
      return undefined;
    };

    const order = new Order({
      userId: session.user.id,               // stored as plain string (Firebase UID)
      user: toObjectId(session.user.id),     // only set if it's a real ObjectId
      orderItems: orderItems.map((x: any) => ({
        name: x.name,
        quantity: x.qty || x.quantity || 1,
        image: x.image,
        price: x.price,
        variant: x.variant,
        productId: x.productId || x._id,
        product: toObjectId(x.productId || x._id), // safe cast — undefined if not an ObjectId
      })),
      shippingAddress: {
        fullName: shippingAddress.fullName || shippingAddress.name,
        email: shippingAddress.email,
        phone: shippingAddress.phone,
        address: shippingAddress.address,
        city: shippingAddress.city,
        state: shippingAddress.state,
        pinCode: shippingAddress.pinCode,
        country: shippingAddress.country || "India",
      },
      shippingInfo: {
        fullName: shippingAddress.fullName || shippingAddress.name,
        email: shippingAddress.email,
        phoneNo: shippingAddress.phone,
        address: shippingAddress.address,
        city: shippingAddress.city,
        state: shippingAddress.state,
        zipCode: shippingAddress.pinCode,
        country: shippingAddress.country || "India",
      },
      paymentMethod,
      paymentInfo: paymentInfo || { id: "COD", status: "Pending" },
      itemsPrice,
      taxAmount: taxPrice || 0,
      shippingAmount: shippingPrice || 0,
      totalAmount: totalPrice,
      orderStatus: "Processing",
    });

    const createdOrder = await order.save();

    // Clear cart if requested
    if (clearCart && session.user.id) {
      const User = (await import("@/models/User")).default;
      await User.findByIdAndUpdate(session.user.id, { cartItems: [] });
    }

    return NextResponse.json({ success: true, order: createdOrder }, { status: 201 });
  } catch (error: any) {
    console.error("Order creation error:", error);
    return NextResponse.json({ message: "Order creation failed", error: error.message }, { status: 500 });
  }
}
