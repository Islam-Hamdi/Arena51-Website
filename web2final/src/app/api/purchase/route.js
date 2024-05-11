import prisma from "@/app/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const body = await req.json();
    const {
      quantity,
      phone,
      address,
      zipcode,
      itemname,
      price,
      gameId,
      purchaserId,
      purchaseId,
    } = body;
    console.log(body);

    const validPrice = parseInt(price);

    const purchase = await prisma.purchases.create({
      data: {
        gameId,
        quantity,
        phone,
        address,
        zipcode,
        itemname,
        price: validPrice,
        purchaseId,
        purchaserId,
      },
    });
    return NextResponse.json(purchase);
    throw new Error("Something went wrong");
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.error("Something went wrong", { status: 500 });
  }
}

export async function GET() {
  try {
    const purchaseHistory = await prisma.purchases.findMany({});
    return NextResponse.json(purchaseHistory);
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.error("Something went wrong", { status: 500 });
  }
}

// function generatePurchaseId() {
//   return (
//     Math.random().toString(36).substring(2, 15) +
//     Math.random().toString(36).substring(2, 15)
//   );
// }
