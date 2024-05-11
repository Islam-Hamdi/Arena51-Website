import prisma from "@/app/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, description, categories, price, quantity,sellerId, image, user } =
      body;

    
    const parsedPrice = parseFloat(price);
    const parsedQuantity = parseInt(quantity, 10);

    // Create the game with the sellerId
    const newGame = await prisma.game.create({
      data: {
        name,
        description,
        categories,
        price: parsedPrice,
        quantity: parsedQuantity,
        sellerId,
        image,
        gameId: generateGameId(),
      },
    });

    return NextResponse.json(newGame);
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.error("Something went wrong", { status: 500 });
  }
}

function generateGameId() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}
