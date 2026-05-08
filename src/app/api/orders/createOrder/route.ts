import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import { getAuthUser } from "@/lib/auth-helper";

export async function POST(req: Request) {
  try {
    const session = await getAuthUser();
    if (!session) return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = await req.json();
    if (!orderItems || orderItems.length === 0) return NextResponse.json({ message: "No order items" }, { status: 400 });
    await connectDB();
    const order = new Order({
      user: session.user.id,
      orderItems: orderItems.map((x: any) => ({ name: x.name, quantity: x.qty || x.quantity, image: x.image, price: x.price, variant: x.variant, productId: x.productId || x._id, product: x.productId || x._id })),
      shippingAddress: { fullName: shippingAddress.fullName, email: shippingAddress.email, phone: shippingAddress.phone, address: shippingAddress.address, city: shippingAddress.city, state: shippingAddress.state, pinCode: shippingAddress.pinCode, country: shippingAddress.country || "India" },
      shippingInfo: { fullName: shippingAddress.fullName, email: shippingAddress.email, phoneNo: shippingAddress.phone, address: shippingAddress.address, city: shippingAddress.city, state: shippingAddress.state, zipCode: shippingAddress.pinCode, country: shippingAddress.country || "India" },
      paymentMethod, itemsPrice, taxAmount: taxPrice || 0, shippingAmount: shippingPrice || 0, totalAmount: totalPrice, orderStatus: "Processing",
    });
    const createdOrder = await order.save();
    return NextResponse.json({ success: true, order: createdOrder }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: "Order creation failed", error: error.message }, { status: 500 });
  }
}
