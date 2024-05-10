// Import necessary modules
import prisma from "@/app/libs/prisma";
import { NextResponse } from "next/server";

// Define the GET request handler function
export async function GET(request, { params }) {
  try {
    // Extract the user ID from the request parameters
    const userId = params.sellerId;

    // Fetch games associated with the provided user ID
    const games = await prisma.game.findMany({
      where: {
        sellerId: userId, // Filter games by seller ID
      },
    });

    // Return the fetched games as a JSON response
    return NextResponse.json(games);
  } catch (error) {
    // Handle errors if any occur
    console.error("An error occurred:", error);
    return NextResponse.error("Something went wrong", { status: 500 });
  }
}
