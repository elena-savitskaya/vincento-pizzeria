import { prisma } from "@/prisma/prisma-client";
import { sendOrderNotification } from "@/lib/telegram";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const {
      name,
      phone,
      deliveryType,
      address,
      city,
      postalCode,
      deliveryTime,
      deliveryHour,
      paymentMethod,
      items,
      totalAmount,
      paymentToken,
    } = data;

    if (!name || !phone) {
      return NextResponse.json(
        { message: "Ім'я та номер телефону обов'язкові" },
        { status: 400 }
      );
    }

    if (deliveryType === "delivery") {
      if (!address || !city || !postalCode) {
        return NextResponse.json(
          { message: "Адреса доставки обов'язкова" },
          { status: 400 }
        );
      }

      if (deliveryTime === "scheduled" && !deliveryHour) {
        return NextResponse.json(
          { message: "Час доставки обов'язковий" },
          { status: 400 }
        );
      }
    }

    const token = req.cookies.get("cartToken")?.value || crypto.randomUUID();
    const orderId = `VMP${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    let paymentStatus = "PENDING";
    if (paymentMethod === "google-pay" && paymentToken) {
      paymentStatus = "COMPLETED";
    }

    const order = await prisma.order.create({
      data: {
        token,
        totalAmount,
        status: "PENDING",
        items: items || [],
        fullName: name,
        phone,
        email: "",
        address: address || "",
        deliveryType,
        city: city || "",
        postalCode: postalCode || "",
        deliveryTime,
        deliveryHour: deliveryHour || "",
        paymentMethod,
        paymentStatus,
        paymentToken: paymentToken || null,
      },
    });

    await sendOrderNotification({
      id: order.id,
      fullName: order.fullName,
      phone: order.phone,
      address: order.address || undefined,
      city: order.city || undefined,
      deliveryType: order.deliveryType,
      totalAmount: order.totalAmount,
      items: order.items,
      paymentMethod: order.paymentMethod,
    });

    return NextResponse.json({
      orderId: `${orderId}`,
      orderNumber: order.id,
      message: "Замовлення успішно створено",
    });
  } catch (error) {
    console.log("[ORDERS_POST] Server error", error);
    return NextResponse.json(
      { message: "Не вдалося створити замовлення" },
      { status: 500 }
    );
  }
}
