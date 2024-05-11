import prisma from "@/app/libs/prisma";
import { NextResponse } from "next/server";

export async function getStaticPaths() {
  const games = await prisma.game.findMany();
  const paths = games.map((game) => ({
    params: { id: game.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  try {
    const { id } = params;
    const game = await prisma.game.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!game) {
      return { notFound: true };
    }

    return { props: { game } };
  } catch (error) {
    console.error("An error occurred:", error);
    return { props: { error: "Something went wrong" } };
  }
}

export async function handler({ request, params }) {
  if (request.method === "GET") {
    const { id } = params;
    const game = await prisma.game.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!game) {
      return NextResponse.error("Game not found", { status: 404 });
    }

    return NextResponse.json(game);
  } else if (request.method === "POST") {
    return NextResponse.error("Method not allowed", { status: 405 });
  }
}
