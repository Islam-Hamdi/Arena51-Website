import prisma from "@/app/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, password, email } = body;

    const existingUser = await prisma.user.findFirst({
      where: { username: { equals: username } },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          user: null,
          message: `User with username '${username}' already exists`,
        },
        { status: 409 }
      );
    }

    const newUser = await prisma.user.create({
      data: {
        username,
        password,
        email,
        userId: generateUserId(), // Generate a unique user ID
      },
    });

    return NextResponse.json(newUser);
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.error("Something went wrong", { status: 500 });
  }
}

function generateUserId() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}
